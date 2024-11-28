document.addEventListener('DOMContentLoaded', () => {
    const summarizeBtn = document.getElementById('summarizeBtn');
    const articleText = document.getElementById('articleText');
    const summaryOutput = document.getElementById('summaryOutput');
  
    summarizeBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage(
        {action: 'summarize', text: articleText.value},
        response => {
          summaryOutput.textContent = response.summary;
        }
      );
    });
  });