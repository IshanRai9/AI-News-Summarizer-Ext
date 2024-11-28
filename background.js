const ANTHROPIC_API_KEY = API ;

async function summarizeArticle(articleText) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ANTHROPIC_API_KEY,
        'Anthropic-Version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `Provide a concise 3-4 sentence summary of the following news article:\n\n${articleText}`
          }
        ]
      })
    });

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Summarization failed:', error);
    return 'Unable to generate summary.';
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    summarizeArticle(request.text)
      .then(summary => {
        sendResponse({summary: summary});
      });
    return true;  // Indicates we wish to send a response asynchronously
  }
});