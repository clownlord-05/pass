function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function getStrengthLabel(score) {
  switch (score) {
    case 5: return { label: 'Rất mạnh', color: '#2ecc71' };
    case 4: return { label: 'Mạnh', color: '#27ae60' };
    case 3: return { label: 'Trung bình', color: '#f1c40f' };
    case 2: return { label: 'Yếu', color: '#e67e22' };
    case 1: return { label: 'rất yếu', color : '#e74c3c'};
    default: return { color: '#e74c3c' };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');

    if (!passwordInput || !togglePassword || !strengthBar || !strengthText) {
      throw new Error("Thiếu phần tử DOM cần thiết.");
    }

    togglePassword.addEventListener('change', () => {
      passwordInput.type = togglePassword.checked ? 'text' : 'password';
    });

    passwordInput.addEventListener('input', () => {
      const pwd = passwordInput.value;
      const score = getPasswordStrength(pwd);
      const { label, color } = getStrengthLabel(score);

      strengthBar.style.width = `${(score / 5) * 100}%`;
      strengthBar.style.backgroundColor = color;
      strengthText.textContent = `Độ mạnh: ${label}`;
    });

  } catch (err) {
    console.error("Lỗi:", err);
    alert("Không thể khởi tạo kiểm tra mật khẩu.");
  }
});
