import React, {Component} from 'react';
class App extends Component {
    constructor() {
        super()
        this.state = {
            fname: "",
            lname: "",
            email: "",
            resarray: []
        }

        this.change = this.change.bind(this)
    }
    change(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    insert = async () => {
        if (this.state.fname === "" || this.state.lname === "" || this.state.email === "") 
            alert("Please enter all details")
         else {
            try {
                var res = await fetch("https://zen-userstask.herokuapp.com/users", {
                    method: "POST",
                    body: JSON.stringify(
                        {fname: this.state.fname, lname: this.state.lname, email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()
                console.log(result)
                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // ..................................................
    update = async () => {
        if (this.state.fname === "" || this.state.lname === "" || this.state.email === "") 
            alert("Please enter all details")
         else {
            try {
                var res = await fetch("https://zen-userstask.herokuapp.com/users", {
                    method: "PUT",
                    body: JSON.stringify(
                        {fname: this.state.fname, lname: this.state.lname, email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()

                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // .........................................
    delete = async () => {
        if (this.state.email === "") 
            alert("Please enter email")
         else {
            try {
                var res = await fetch("https://zen-userstask.herokuapp.com/users", {
                    method: "DELETE",
                    body: JSON.stringify(
                        {email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()
                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // ................................................


    display = async () => {

        try {
            var res = await fetch("https://zen-userstask.herokuapp.com/users")
            var result = await res.json()
            this.setState({resarray: result})
        } catch (err) {
            console.log(err)
        }

    }


    render() {
        return (
            <div style={
                {
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center"
                }
            }>
                <h1>CRUD User Data</h1>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                marginLeft: "550px"
                            }
                        }
                        className="form-control"
                        name={"fname"}
                        placeholder={"First Name"}
                        onChange={
                            this.change
                        }/></div>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                marginLeft: "550px"
                            }
                        }
                        className="form-control"
                        name={"lname"}
                        placeholder={"Last Name"}
                        onChange={
                            this.change
                        }/></div>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px",
                                marginLeft: "550px"
                            }
                        }
                        className="form-control"
                        name={"email"}
                        placeholder={"Email"}
                        onChange={
                            this.change
                        }/></div>
                <button className="btn btn-primary mr-2"  onClick={
                    this.insert
                }>
                    {"Insert"}</button>
                <button className="btn btn-primary mr-2" onClick={
                    this.update
                }>
                    {"Update"}</button>
                <button className="btn btn-primary mr-2"  onClick={
                    this.delete
                }>
                    {"Delete"}</button>
                <button className="btn btn-primary mr-2"  onClick={
                    this.display
                }>
                    {"Display"}</button>
                <div style={
                    {
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center"
                    }
                }>
                    <h3 style={
                        {color: "blue"}
                    }>
                        <ul>{
                            this.state.resarray.map((ele) => (
                                <li key={
                                    ele._id
                                }>FirstName::{
                                    ele.fname
                                }<br/>LastName::{
                                    ele.lname
                                }<br/>Email::{
                                    ele.email
                                }<br/></li>
                            ))
                        } </ul>
                    </h3>
                </div>
            </div>

        )
    }
}


export default App;
