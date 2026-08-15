import aiohttp
import base64
from typing import Dict, List, Optional
import re

async def fetch_github_repo(repo_url: str) -> Optional[Dict]:
    """
    Fetch GitHub repository content
    """
    try:
        # Parse GitHub URL
        pattern = r'github\.com/([^/]+)/([^/]+)'
        match = re.search(pattern, repo_url)
        
        if not match:
            raise ValueError("Invalid GitHub URL")
        
        owner, repo = match.groups()
        repo = repo.replace('.git', '')
        
        # GitHub API base URL
        api_url = f"https://api.github.com/repos/{owner}/{repo}"
        
        async with aiohttp.ClientSession() as session:
            # Get repo info
            async with session.get(api_url) as response:
                if response.status != 200:
                    raise Exception(f"Failed to fetch repo: {response.status}")
                repo_info = await response.json()
            
            # Get repo tree (file structure)
            tree_url = f"{api_url}/git/trees/{repo_info['default_branch']}?recursive=1"
            async with session.get(tree_url) as response:
                if response.status != 200:
                    raise Exception(f"Failed to fetch tree: {response.status}")
                tree_data = await response.json()
            
            # Filter Python files
            python_files = [
                item for item in tree_data.get('tree', [])
                if item['type'] == 'blob' and item['path'].endswith('.py')
            ][:10]  # Limit to 10 files
            
            # Fetch file contents
            files = []
            for file_item in python_files:
                try:
                    async with session.get(file_item['url']) as response:
                        if response.status == 200:
                            file_data = await response.json()
                            content = base64.b64decode(file_data['content']).decode('utf-8')
                            files.append({
                                'name': file_item['path'],
                                'content': content
                            })
                except Exception as e:
                    print(f"Error fetching file {file_item['path']}: {e}")
                    continue
            
            # Build structure
            structure = build_structure(tree_data.get('tree', []))
            
            return {
                'name': repo_info['name'],
                'description': repo_info.get('description', ''),
                'language': repo_info.get('language', 'Python'),
                'files': files,
                'structure': structure
            }
            
    except Exception as e:
        print(f"Error in fetch_github_repo: {str(e)}")
        return None

def build_structure(tree_items: List[Dict]) -> str:
    """
    Build a visual representation of the repo structure
    """
    dirs = set()
    files = []
    
    for item in tree_items:
        path = item['path']
        if '/' in path:
            dirs.add(path.split('/')[0])
        else:
            files.append(path)
    
    structure = "📁 Repository Structure:\n"
    for dir_name in sorted(dirs):
        structure += f"  📁 {dir_name}/\n"
    
    structure += "\n📄 Root Files:\n"
    for file_name in sorted(files)[:5]:
        structure += f"  📄 {file_name}\n"
    
    return structure
