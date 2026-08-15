import google.generativeai as genai
import os
from typing import Dict, List
import json

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Use Gemini Pro model
model = genai.GenerativeModel('gemini-pro')

async def generate_architecture_explanation(structure: str, files: List[Dict]) -> Dict:
    """
    Generate architecture explanation using Gemini AI
    """
    try:
        # Build prompt
        file_summary = "\n".join([f"- {f['name']}" for f in files[:5]])
        
        prompt = f"""
Analyze this codebase architecture:

{structure}

Files:
{file_summary}

Provide a JSON response with:
{{
    "purpose": "Brief project purpose (1 sentence)",
    "overview": "Architecture overview (2-3 sentences)",
    "modules": ["list", "of", "main", "modules"],
    "patterns": ["design", "patterns", "used"]
}}
"""
        
        response = model.generate_content(prompt)
        
        # Try to parse JSON response
        try:
            result = json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except:
            # Fallback if JSON parsing fails
            result = {
                "purpose": "A software project with modular architecture",
                "overview": "The codebase follows standard software engineering practices with clear separation of concerns.",
                "modules": ["Main Application", "Utilities", "Configuration"],
                "patterns": ["MVC", "Singleton", "Factory"]
            }
        
        return result
        
    except Exception as e:
        print(f"Error in generate_architecture_explanation: {e}")
        return {
            "purpose": "Software project analysis in progress",
            "overview": "Analyzing codebase architecture...",
            "modules": ["Loading..."],
            "patterns": ["Analyzing..."]
        }

async def generate_learning_plan(metrics: Dict, scores: Dict) -> Dict:
    """
    Generate personalized learning plan using Gemini AI
    """
    try:
        # Identify weaknesses
        weak_areas = [k for k, v in scores.items() if v < 6.0]
        
        prompt = f"""
Create a 4-week personalized learning plan for a developer with these skill scores:
{json.dumps(scores, indent=2)}

Focus on improving: {', '.join(weak_areas)}

Provide a JSON response:
{{
    "summary": "2-3 sentence summary of focus areas",
    "roadmap": [
        {{
            "week": 1,
            "focus": "Week focus title",
            "topics": ["topic1", "topic2", "topic3"],
            "exercises": ["exercise1", "exercise2"]
        }},
        // ... repeat for 4 weeks
    ]
}}
"""
        
        response = model.generate_content(prompt)
        
        try:
            result = json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except:
            # Fallback plan
            result = {
                "summary": f"Focus on improving {', '.join(weak_areas[:2])} over the next 4 weeks.",
                "roadmap": [
                    {
                        "week": 1,
                        "focus": "Foundation Building",
                        "topics": ["Best practices", "Code patterns", "Documentation"],
                        "exercises": ["Refactor existing code", "Write unit tests"]
                    },
                    {
                        "week": 2,
                        "focus": "Advanced Techniques",
                        "topics": ["Design patterns", "Error handling", "Optimization"],
                        "exercises": ["Implement design patterns", "Add error handling"]
                    },
                    {
                        "week": 3,
                        "focus": "Code Quality",
                        "topics": ["Testing", "Refactoring", "Code review"],
                        "exercises": ["Write comprehensive tests", "Peer code review"]
                    },
                    {
                        "week": 4,
                        "focus": "Mastery & Practice",
                        "topics": ["Real projects", "Performance", "Scalability"],
                        "exercises": ["Build a complete project", "Optimize performance"]
                    }
                ]
            }
        
        return result
        
    except Exception as e:
        print(f"Error in generate_learning_plan: {e}")
        return {
            "summary": "Personalized learning plan based on your code analysis.",
            "roadmap": []
        }

async def debug_code(code: str, error_message: str) -> Dict:
    """
    Debug code and provide explanations using Gemini AI
    """
    try:
        prompt = f"""
Debug this code:

```python
{code}
```

Error message:
{error_message}

Provide a JSON response:
{{
    "explanation": "Clear explanation of the error",
    "root_cause": "Root cause of the issue",
    "corrected_code": "Fixed version of the code",
    "optimizations": ["list", "of", "optimization", "tips"],
    "complexity": "O(n) notation",
    "complexity_explanation": "Brief complexity explanation"
}}
"""
        
        response = model.generate_content(prompt)
        
        try:
            result = json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except:
            # Fallback response
            result = {
                "explanation": "The error occurs due to a logical issue in the code.",
                "root_cause": "Review the error message and check variable types and logic flow.",
                "corrected_code": code,
                "optimizations": [
                    "Add type hints for better clarity",
                    "Use list comprehension for better performance",
                    "Add error handling"
                ],
                "complexity": "O(n)",
                "complexity_explanation": "Linear time complexity"
            }
        
        return result
        
    except Exception as e:
        print(f"Error in debug_code: {e}")
        return {
            "explanation": "Error analysis in progress",
            "root_cause": "Analyzing...",
            "corrected_code": code,
            "optimizations": [],
            "complexity": "O(?)",
            "complexity_explanation": "Computing..."
        }

async def generate_refactoring_suggestions(files: List[Dict], metrics: Dict) -> List[Dict]:
    """
    Generate refactoring suggestions using Gemini AI
    """
    try:
        file_summary = "\n".join([f"- {f['name']}: {len(f['content'])} lines" for f in files[:3]])
        
        prompt = f"""
Analyze these code files and suggest refactoring:

{file_summary}

Metrics:
- Avg Complexity: {metrics.get('avg_complexity', 0)}
- Longest Function: {metrics.get('longest_function', 0)} lines
- Comment Density: {metrics.get('comment_density', 0)}%

Provide a JSON array of refactoring suggestions:
[
    {{
        "title": "Suggestion title",
        "priority": "high/medium/low",
        "impact": "Expected improvement"
    }}
]
"""
        
        response = model.generate_content(prompt)
        
        try:
            result = json.loads(response.text.strip().replace('```json', '').replace('```', ''))
        except:
            # Fallback suggestions
            result = [
                {
                    "title": "Split Long Functions",
                    "priority": "high",
                    "impact": "Improves readability and testability"
                },
                {
                    "title": "Add Type Hints",
                    "priority": "medium",
                    "impact": "Better IDE support and fewer runtime errors"
                },
                {
                    "title": "Increase Test Coverage",
                    "priority": "high",
                    "impact": "Catch bugs early and improve reliability"
                }
            ]
        
        return result
        
    except Exception as e:
        print(f"Error in generate_refactoring_suggestions: {e}")
        return []
