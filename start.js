document.getElementById("start-btn").addEventListener("click", function(event) {
    event.preventDefault(); // 阻止表單提交
    console.log("Start button clicked");
    window.location.href = "index.html"; // 跳轉
  });
