from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import os
from dotenv import load_dotenv

# Import our services
from services.github_fetcher import fetch_github_repo
from services.static_analyzer import analyze_code_quality
from services.ai_service import (
    generate_architecture_explanation,
    generate_learning_plan,
    debug_code,
    generate_refactoring_suggestions
)

load_dotenv()

app = FastAPI(title="DevX-Ray AI API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class RepoAnalysisRequest(BaseModel):
    repo_url: str

class DebugRequest(BaseModel):
    code: str
    error_message: str

class RefactorRequest(BaseModel):
    code: str

# Response Models
class SkillScores(BaseModel):
    architecture: float
    algorithm: float
    modularity: float
    error_handling: float
    readability: float
    maintainability: float

class Metrics(BaseModel):
    avg_complexity: float
    longest_function: int
    maintainability_index: float
    comment_density: float

class RepoSummary(BaseModel):
    project_name: str
    purpose: str
    language: str

@app.get("/")
async def root():
    return {
        "message": "DevX-Ray AI API",
        "version": "1.0.0",
        "status": "running"
    }

@app.post("/analyze-repo")
async def analyze_repo(request: RepoAnalysisRequest):
    """
    Analyze a GitHub repository
    """
    try:
        # Step 1: Fetch repo content
        print(f"Fetching repo: {request.repo_url}")
        repo_data = await fetch_github_repo(request.repo_url)
        
        if not repo_data:
            raise HTTPException(status_code=400, detail="Failed to fetch repository")
        
        # Step 2: Run static analysis
        print("Running static analysis...")
        static_metrics = analyze_code_quality(repo_data['files'])
        
        # Step 3: Generate AI insights
        print("Generating AI insights...")
        architecture = await generate_architecture_explanation(
            repo_data['structure'],
            repo_data['files']
        )
        
        # Step 4: Calculate skill scores
        skill_scores = calculate_skill_scores(static_metrics)
        
        # Step 5: Generate learning plan
        learning_plan = await generate_learning_plan(static_metrics, skill_scores)
        
        # Step 6: Generate refactoring suggestions
        refactoring = await generate_refactoring_suggestions(
            repo_data['files'],
            static_metrics
        )
        
        return {
            "summary": {
                "project_name": repo_data['name'],
                "purpose": architecture.get('purpose', 'Analyzing...'),
                "language": repo_data['language']
            },
            "metrics": {
                "avg_complexity": static_metrics['avg_complexity'],
                "longest_function": static_metrics['longest_function'],
                "maintainability_index": static_metrics['maintainability_index'],
                "comment_density": static_metrics['comment_density']
            },
            "skill_scores": skill_scores,
            "architecture": architecture,
            "weaknesses": static_metrics['weaknesses'],
            "learning_plan": learning_plan,
            "refactoring": refactoring
        }
        
    except Exception as e:
        print(f"Error analyzing repo: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/debug-code")
async def debug_code_endpoint(request: DebugRequest):
    """
    Debug code and provide explanations
    """
    try:
        result = await debug_code(request.code, request.error_message)
        return result
    except Exception as e:
        print(f"Error debugging code: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-learning-plan")
async def generate_learning_plan_endpoint(metrics: dict, scores: dict):
    """
    Generate personalized learning plan
    """
    try:
        plan = await generate_learning_plan(metrics, scores)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/refactor-suggestions")
async def refactor_suggestions_endpoint(request: RefactorRequest):
    """
    Generate refactoring suggestions
    """
    try:
        suggestions = await generate_refactoring_suggestions(
            [{'name': 'code.py', 'content': request.code}],
            {}
        )
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def calculate_skill_scores(metrics: Dict) -> Dict[str, float]:
    """
    Calculate skill scores from static metrics
    """
    # Architecture Thinking (based on complexity and structure)
    architecture = max(0, 10 - (metrics['avg_complexity'] / 2))
    
    # Algorithm Optimization (based on complexity)
    algorithm = max(0, 10 - (metrics['avg_complexity'] / 1.5))
    
    # Modularity (based on function length)
    modularity = max(0, 10 - (metrics['longest_function'] / 15))
    
    # Error Handling (from static analysis)
    error_handling = metrics.get('error_handling_score', 5.0)
    
    # Readability (based on comments and complexity)
    readability = min(10, (metrics['comment_density'] / 5) + 5)
    
    # Maintainability (from maintainability index)
    maintainability = metrics['maintainability_index'] / 10
    
    return {
        "architecture": round(min(10, architecture), 1),
        "algorithm": round(min(10, algorithm), 1),
        "modularity": round(min(10, modularity), 1),
        "error_handling": round(min(10, error_handling), 1),
        "readability": round(min(10, readability), 1),
        "maintainability": round(min(10, maintainability), 1),
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
