class Parent{
    constructor(id,address,children,dob,email,fullname,gallery,gender,image,mobile,password,username){
        this.id=id;
        this.children=children;
        this.dob=dob;
        this.fullname=fullname;
        this.gallery=gallery;
        this.image=image;
        this.mobile=mobile;
        this.password=password;
        this.address=address;
        this.username=username;
        this.email=email;
        this.gender=gender;
    }
}
module.exports=Parent;