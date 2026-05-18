import axios from 'axios';

export const getAIRecommendation = async (req, res) => {
  try {
    const { employeeData } = req.body;

    if (!employeeData) {
      return res.status(400).json({ message: 'Employee data is required' });
    }

    const prompt = `
Analyze the following employee performance data and provide promotion recommendations, ranking, skill gap analysis, training suggestions, and improvement feedback.

Employee Data:
Name: ${employeeData.name}
Department: ${employeeData.department}
Experience: ${employeeData.experience} years
Performance Score: ${employeeData.performanceScore}/100
Skills: ${employeeData.skills ? employeeData.skills.join(', ') : 'N/A'}

Provide the response in the following structured Markdown format:
### Summary
[Brief summary of employee's performance]

### Promotion Recommendation
[Yes/No/Wait and reasoning]

### Skill Gap Analysis
[List of missing skills or areas to improve based on department/role]

### Training Suggestions
[Specific courses or subjects to learn]

### Improvement Feedback
[Actionable feedback for the employee]
    `;

    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterApiKey) {
      // Mock response if no API key is provided
      return res.status(200).json({
        recommendation: `### Summary\n${employeeData.name} has a score of ${employeeData.performanceScore}/100.\n\n### Promotion Recommendation\nRequires valid OpenRouter API Key for real insights.\n\n### Skill Gap Analysis\nN/A\n\n### Training Suggestions\nN/A\n\n### Improvement Feedback\nPlease add OPENROUTER_API_KEY in backend .env`
      });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.CLIENT_URL || 'https://ai-based-employee-performance-analytics-cesd.onrender.com',
          'X-Title': 'Employee Analytics App',
        },
      }
    );

    const recommendation = response.data.choices[0].message.content;
    res.status(200).json({ recommendation });
  } catch (error) {
    console.error('AI Recommendation Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch AI recommendation' });
  }
};
