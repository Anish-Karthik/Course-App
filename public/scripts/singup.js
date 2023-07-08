function signup() {
    currentUrl = window.location.href;
    const type = currentUrl.includes("admin")? "admin" : "user";
    
    fetch(`${currentUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    }).then((res) => {
        if (res.status === 201) {
            window.location.href = `${currentUrl}/../login`;
            alert(`${type} created successfully`);
        } else {
            alert(`${type} already exists`);   
        }
    });
}