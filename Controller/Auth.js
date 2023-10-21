const getEle = (id) => document.getElementById(id);
const Register = () => {
  let username = getEle("Username").value;
  let password = getEle("Password").value;
  let newUser = {
    username,
    password,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  
  JSON.parse(localStorage.getItem("users")) || [];
  //Xác nhận đăng ký
            alert("Đăng ký thành công!");

            // Xóa dữ liệu trong các trường nhập
            getEle("Username").value= "";
            getEle("Password").value = "";
  // Sau khi đăng ký, chuyển hướng đến trang đăng nhập
  window.location.href = "login.html";
};
