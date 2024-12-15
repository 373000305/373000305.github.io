document.getElementById('passwordGeneratorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const length = parseInt(document.getElementById('length').value, 10);
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    // Check if the length is a positive integer
    if (isNaN(length) || length <= 0) {
        showError("请输入一个正整数作为密码长度");
        return;
    }

    let charPool = '';
    let password = '';

    if (uppercase) charPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charPool += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charPool += '0123456789';
    if (symbols) charPool += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    // If no options are checked, show error
    if (!charPool) {
        showError("请选择至少一种字符类型");
        return;
    }

    
    const requiredChars = [];
    if (uppercase) requiredChars.push('A');
    if (lowercase) requiredChars.push('a');
    if (numbers) requiredChars.push('0');
    if (symbols) requiredChars.push('!');

    if (requiredChars.length > length) {
        showError("所选参数无法适应指定的密码长度");
        return;
    }


    password = requiredChars.join('');


    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }


    password = password.split('').sort(() => Math.random() - 0.5).join('');

  
    document.getElementById('generated-password').textContent = `生成的密码: ${password}`;
    document.getElementById('error-message').textContent = '';
});

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('generated-password').textContent = '';
}