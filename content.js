function extractArticleText() {
    // Implement article text extraction logic
    // This will vary depending on website structure
    // Example for a generic news site:
    const articleContent = document.querySelector('article, .article-body, .content');
    return articleContent ? articleContent.innerText : '';
  }
  
  function injectSummaryButton() {
    const button = document.createElement('button');
    button.textContent = 'AI Summarize';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
  
    button.addEventListener('click', () => {
      const articleText = extractArticleText();
      chrome.runtime.sendMessage(
        {action: 'summarize', text: articleText},
        response => {
          alert(response.summary);
        }
      );
    });
  
    document.body.appendChild(button);
  }
  
  injectSummaryButton();