document.getElementById("connexion-section").onmousemove = e => {
    for(const child of document.getElementsByClassName("child")) {
      const rect = child.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
        child.style.setProperty("--mouse-x", `${x}px`);
        child.style.setProperty("--mouse-y", `${y}px`);
    };
  }