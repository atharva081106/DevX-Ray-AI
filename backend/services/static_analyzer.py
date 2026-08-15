from radon.complexity import cc_visit
from radon.metrics import mi_visit, h_visit
from typing import Dict, List
import re

def analyze_code_quality(files: List[Dict]) -> Dict:
    """
    Analyze code quality using static analysis
    """
    total_complexity = 0
    complexity_count = 0
    longest_function = 0
    maintainability_scores = []
    total_lines = 0
    comment_lines = 0
    exception_handling_count = 0
    total_functions = 0
    weaknesses = []
    
    for file_item in files:
        try:
            content = file_item['content']
            file_name = file_item['name']
            
            # Count lines and comments
            lines = content.split('\n')
            total_lines += len(lines)
            comment_lines += sum(1 for line in lines if line.strip().startswith('#'))
            
            # Cyclomatic complexity
            try:
                complexity_results = cc_visit(content)
                for item in complexity_results:
                    total_complexity += item.complexity
                    complexity_count += 1
                    total_functions += 1
                    
                    # Check function length
                    func_lines = item.endline - item.lineno
                    longest_function = max(longest_function, func_lines)
                    
                    # Detect long functions
                    if func_lines > 50:
                        weaknesses.append({
                            'severity': 'high',
                            'issue': f'Long function: {item.name}',
                            'details': f'Function has {func_lines} lines',
                            'line': f'{file_name}:{item.lineno}'
                        })
                    
                    # Detect high complexity
                    if item.complexity > 10:
                        weaknesses.append({
                            'severity': 'high',
                            'issue': f'High complexity in {item.name}',
                            'details': f'Cyclomatic complexity: {item.complexity}',
                            'line': f'{file_name}:{item.lineno}'
                        })
            except Exception as e:
                print(f"Error analyzing complexity for {file_name}: {e}")
            
            # Maintainability index
            try:
                mi_score = mi_visit(content, multi=True)
                if mi_score:
                    maintainability_scores.append(mi_score)
            except Exception as e:
                print(f"Error calculating MI for {file_name}: {e}")
            
            # Exception handling analysis
            exception_handling_count += content.count('try:')
            
            # Check for missing error handling
            if 'def ' in content and 'try:' not in content:
                weaknesses.append({
                    'severity': 'medium',
                    'issue': 'Missing error handling',
                    'details': 'No try-except blocks found',
                    'line': f'{file_name}'
                })
            
            # Check for naming conventions
            if re.search(r'[A-Z][a-z]+[A-Z]', content):
                weaknesses.append({
                    'severity': 'low',
                    'issue': 'Inconsistent naming',
                    'details': 'Mix of camelCase and snake_case detected',
                    'line': f'{file_name}'
                })
            
        except Exception as e:
            print(f"Error analyzing file {file_item['name']}: {e}")
            continue
    
    # Calculate averages
    avg_complexity = total_complexity / complexity_count if complexity_count > 0 else 0
    avg_maintainability = sum(maintainability_scores) / len(maintainability_scores) if maintainability_scores else 50
    comment_density = (comment_lines / total_lines * 100) if total_lines > 0 else 0
    error_handling_score = min(10, (exception_handling_count / max(1, total_functions)) * 10)
    
    return {
        'avg_complexity': round(avg_complexity, 2),
        'longest_function': longest_function,
        'maintainability_index': round(avg_maintainability, 2),
        'comment_density': round(comment_density, 2),
        'error_handling_score': round(error_handling_score, 1),
        'weaknesses': weaknesses[:10],  # Limit to top 10
        'total_functions': total_functions,
        'total_lines': total_lines
    }
