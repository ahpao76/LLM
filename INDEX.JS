// 獲取HTML元素
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');


// 綁定按鈕事件
sendButton.addEventListener("click", sendMessage);

// 綁定 Enter 鍵事件
userInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const question = userInput.value;

  if (question.trim()) {
    // 將使用者訊息顯示在對話欄
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user-message");
    userMessage.innerHTML = `<p>${question}</p>`;
    chatBox.appendChild(userMessage);

    // 清空輸入欄
    userInput.value = "";

    // 發送請求到伺服器
    fetch('http://127.0.0.1:5001/ask', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question })
    })
      .then(response => response.json())
      .then(data => {
        // 將伺服器回應顯示在聊天室
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.innerHTML = `<p>${data.answer}</p>`;
        chatBox.appendChild(botMessage);

        // 自動滾動到最新訊息
        chatBox.scrollTop = chatBox.scrollHeight;
      })
      .catch(error => console.error('Error:', error));
  } else {
    alert("請輸入您的問題");
  }
}
