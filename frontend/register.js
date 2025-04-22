document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ register.js loaded");

  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // מונע שליחה רגילה של הטופס
    console.log("📤 שליחת טופס התחילה");

    const email = document.getElementById("register-email").value.toLowerCase().trim(); // ✅ תיקון פה
    const password = document.getElementById("register-password").value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ נרשמת בהצלחה!");
        console.log("🎉 משתמש נוסף:", data);
        window.location.href = "index.html";
      } else {
        alert("❌ שגיאה בהרשמה: " + (data.error || "נסה שוב מאוחר יותר"));
        console.warn("⚠️ שגיאה מהשרת:", data);
      }
    } catch (err) {
      console.error("🔥 שגיאה בשרת:", err);
      alert("❌ שגיאה כללית. בדוק חיבור לשרת.");
    }
  });
});
