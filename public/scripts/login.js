function login() {
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
        if (res.status === 200) {
            if (currentUrl.includes("admin")) {
                window.location.href = `/admin/home`;
            } else {
                window.location.href = `/user/${username}/home`;
            }
            alert(`${type} logged in successfully`);
        } else {
            alert(`${type} does not exist`);   
        }
    });
}
