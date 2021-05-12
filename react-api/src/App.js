// src/App.js
    
import React, {Component} from 'react';
import axios from "axios";
    
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {employees: "", employee: "", postEmployee: "", putEmployee: "", skills: "", skill: "", postSkill: "", putSkill: "",
                  employeesClear: "invisible", employeeClear: "invisible", postEmployeeClear: "invisible", putEmployeeClear: "invisible",
                  removePostSkill: "invisible", removePutSkill: "invisible", getSkillsClear: "invisible", getSkillClear: "invisible",
                  postSkillClear: "invisible", putSkillClear: "invisible",
                  getEmployeeID: "", deleteEmployeeID: "", postEmployeeData: {}, putEmployeeData: {}, 
                  getSkillData: {}, postSkillData: {}, putSkillData: {}, deleteSkillData: {},
                  getSkillsID: "", getSkillEmployeeID: "", getSkillSkillID: "",
                  postSkills: [], putSkills: [],
                };
    
    this.handleGetEmployees = this.handleGetEmployees.bind(this);
    this.handleEmployeesClear = this.handleEmployeesClear.bind(this);

    this.handleGetEmployee = this.handleGetEmployee.bind(this);
    this.handleEmployeeClear = this.handleEmployeeClear.bind(this);
    this.handleGetIDChange = this.handleGetIDChange.bind(this);

    this.handlePostChange = this.handlePostChange.bind(this);
    this.addPostSkill = this.addPostSkill.bind(this);
    this.removePostSkill = this.removePostSkill.bind(this);
    this.handlePostEmployeeSubmit = this.handlePostEmployeeSubmit.bind(this);
    this.handlePostEmployeeClear = this.handlePostEmployeeClear.bind(this);
    this.handlePostEmployeeChange = this.handlePostEmployeeChange.bind(this);

    this.handlePutChange = this.handlePutChange.bind(this);
    this.addPutSkill = this.addPutSkill.bind(this);
    this.removePutSkill = this.removePutSkill.bind(this);
    this.handlePutEmployeeSubmit = this.handlePutEmployeeSubmit.bind(this);
    this.handlePutEmployeeClear = this.handlePutEmployeeClear.bind(this);
    this.handlePutEmployeeChange = this.handlePutEmployeeChange.bind(this);

    this.handleDeleteEmployee = this.handleDeleteEmployee.bind(this);
    this.handleDeleteIDChange = this.handleDeleteIDChange.bind(this);

    this.handleGetSkillsChange = this.handleGetSkillsChange.bind(this);
    this.handleGetSkills = this.handleGetSkills.bind(this);
    this.handleSkillsClear = this.handleSkillsClear.bind(this);

    this.handleGetSkillChange = this.handleGetSkillChange.bind(this);
    this.handleGetSkill = this.handleGetSkill.bind(this);
    this.handleSkillClear = this.handleSkillClear.bind(this);

    this.handlePostSkill = this.handlePostSkill.bind(this);
    this.handlePostSkillChange = this.handlePostSkillChange.bind(this);
    this.handlePostSkillClear = this.handlePostSkillClear.bind(this);

    this.handlePutSkill = this.handlePutSkill.bind(this);
    this.handlePutSkillChange = this.handlePutSkillChange.bind(this);
    this.handlePutSkillClear = this.handlePutSkillClear.bind(this);

    this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
    this.handleDeleteSkillChange = this.handleDeleteSkillChange.bind(this);
  }

  handleGetEmployees = event => {
    event.preventDefault();
    axios.get("http://localhost:8080/employees")
      .then((response) => {
        this.setState({ employees: JSON.stringify(response.data, null, '\t'), employeesClear: "visible" });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleEmployeesClear = event => {
    event.preventDefault();
    this.setState({ employees: "", employeesClear: "invisible"});
  }

  handleGetEmployee = event => {
    event.preventDefault();
    axios.get("http://localhost:8080/employees/" + this.state.getEmployeeID)
      .then((response) => {
        this.setState({employee: JSON.stringify(response.data, null, '\t'), employeeClear: "visible" })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleEmployeeClear = event => {
    event.preventDefault();
    this.setState({ employee: "", employeeClear: "invisible" });
  }

  handleGetIDChange = event => {
    this.setState({ getEmployeeID: event.target.value });
  }

  handlePostChange = event => {
    this.setState(prevState => {
      let postEmployeeData = Object.assign({}, prevState.postEmployeeData);
      postEmployeeData[event.target.name] = event.target.value;
      return { postEmployeeData };
    })
  }

  addPostSkill = event => {
    this.setState((prevState) => ({
      postSkills: [...prevState.postSkills, {skillId:"", fieldId:"", fieldName:"", fieldType:"", experience:"", summary:""}],
    }));
    this.setState({ removePostSkill: "visible" });
  }

  removePostSkill = event => {
    var array = [...this.state.postSkills];
    array.pop();
    this.setState({ postSkills: array });
    if (array.length === 0) {
      this.setState({ removePostSkill: "invisible" });
    }
  }

  handlePostEmployeeSubmit = event => {
    event.preventDefault();
    let postData = {};
    let addressData = {};
    postData.id = this.state.postEmployeeData.id;
    postData.firstName = this.state.postEmployeeData.firstName;
    postData.lastName = this.state.postEmployeeData.lastName;
    addressData.id = this.state.postEmployeeData.addressId;
    addressData.street = this.state.postEmployeeData.street;
    addressData.suite = !('suite' in this.state.postEmployeeData) ? "" : this.state.postEmployeeData.suite;
    addressData.city = this.state.postEmployeeData.city;
    addressData.region = this.state.postEmployeeData.region;
    addressData.postal = this.state.postEmployeeData.postal;
    addressData.country = this.state.postEmployeeData.country;
    postData.address = addressData;
    postData.contactEmail = !('contactEmail' in this.state.postEmployeeData) ? "" : this.state.postEmployeeData.contactEmail;
    postData.companyEmail = this.state.postEmployeeData.companyEmail;
    postData.birthDate = this.state.postEmployeeData.birthDate;
    postData.hiredDate = this.state.postEmployeeData.hiredDate;
    postData.role = this.state.postEmployeeData.role;
    postData.businessUnit = !('businessUnit' in this.state.postEmployeeData) ? "" : this.state.postEmployeeData.businessUnit;
    postData.skills = [];
    for (let i = 0; i < this.state.postSkills.length; i++) {
      let newSkill = {};
      newSkill.id = this.state.postSkills[i].skillId;
      let newField = {};
      newField.id = this.state.postSkills[i].fieldId;
      newField.name = this.state.postSkills[i].fieldName;
      newField.type = this.state.postSkills[i].fieldType;
      newSkill.field = newField;
      newSkill.experience = this.state.postSkills[i].experience;
      newSkill.summary = !('summary' in this.state.postSkills[i]) ? "" : this.state.postSkills[i].summary;
      postData.skills.push(newSkill);
    }
    postData.assignedTo = !('assignedTo' in this.state.postEmployeeData) ? "" : this.state.postEmployeeData.assignedTo;
    axios.post("http://localhost:8080/employees/", postData)
      .then((response) => {
        this.setState({postEmployee: JSON.stringify(response.data, null, '\t'), postEmployeeClear: "visible" })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handlePostEmployeeClear = event => {
    event.preventDefault();
    this.setState({ postEmployee: "", postEmployeeClear: "invisible" });
  }

  handlePostEmployeeChange = event => {
    if (["skillId", "fieldId", "fieldName", "fieldType", "experience", "summary"].includes(event.target.className) ) {
      let postSkills = [...this.state.postSkills]
      postSkills[event.target.dataset.id][event.target.className] = event.target.value
      this.setState({ postSkills }, () => console.log(this.state.postSkills))
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  handlePutChange = event => {
    this.setState(prevState => {
      let putEmployeeData = Object.assign({}, prevState.putEmployeeData);
      putEmployeeData[event.target.name] = event.target.value;
      return { putEmployeeData };
    })
  }

  addPutSkill = event => {
    this.setState((prevState) => ({
      putSkills: [...prevState.putSkills, {putSkillId:"", putFieldId:"", putFieldName:"", putFieldType:"", putExperience:"", putSummary:""}],
    }));
    this.setState({ removePutSkill: "visible" });
  }

  removePutSkill = event => {
    var array = [...this.state.putSkills];
    array.pop();
    this.setState({ putSkills: array });
    if (array.length === 0) {
      this.setState({ removePutSkill: "invisible" });
    }
  }

  handlePutEmployeeSubmit = event => {
    event.preventDefault();
    let putData = {};
    let addressData = {};
    putData.id = this.state.putEmployeeData.id;
    putData.firstName = this.state.putEmployeeData.firstName;
    putData.lastName = this.state.putEmployeeData.lastName;
    addressData.id = this.state.putEmployeeData.addressId;
    addressData.street = this.state.putEmployeeData.street;
    addressData.suite = !('suite' in this.state.putEmployeeData) ? "" : this.state.putEmployeeData.suite;
    addressData.city = this.state.putEmployeeData.city;
    addressData.region = this.state.putEmployeeData.region;
    addressData.postal = this.state.putEmployeeData.postal;
    addressData.country = this.state.putEmployeeData.country;
    putData.address = addressData;
    putData.contactEmail = !('contactEmail' in this.state.putEmployeeData) ? "" : this.state.putEmployeeData.contactEmail;
    putData.companyEmail = this.state.putEmployeeData.companyEmail;
    putData.birthDate = this.state.putEmployeeData.birthDate;
    putData.hiredDate = this.state.putEmployeeData.hiredDate;
    putData.role = this.state.putEmployeeData.role;
    putData.businessUnit = !('businessUnit' in this.state.putEmployeeData) ? "" : this.state.putEmployeeData.businessUnit;
    putData.skills = [];
    for (let i = 0; i < this.state.putSkills.length; i++) {
      let newSkill = {};
      newSkill.id = this.state.putSkills[i].skillId;
      let newField = {};
      newField.id = this.state.putSkills[i].fieldId;
      newField.name = this.state.putSkills[i].fieldName;
      newField.type = this.state.putSkills[i].fieldType;
      newSkill.field = newField;
      newSkill.experience = this.state.putSkills[i].experience;
      newSkill.summary = !('summary' in this.state.putSkills[i]) ? "" : this.state.putSkills[i].summary;
      putData.skills.push(newSkill);
    }
    putData.assignedTo = !('assignedTo' in this.state.putEmployeeData) ? "" : this.state.putEmployeeData.assignedTo;
    axios.put("http://localhost:8080/employees/" + this.state.putEmployeeData.id, putData)
      .then((response) => {
        this.setState({putEmployee: JSON.stringify(response.data, null, '\t'), putEmployeeClear: "visible" })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handlePutEmployeeClear = event => {
    event.preventDefault();
    this.setState({ putEmployee: "", putEmployeeClear: "invisible" });
  }

  handlePutEmployeeChange = event => {
    if (["skillId", "fieldId", "fieldName", "fieldType", "experience", "summary"].includes(event.target.className) ) {
      let putSkills = [...this.state.putSkills]
      putSkills[event.target.dataset.id][event.target.className] = event.target.value
      this.setState({ putSkills }, () => console.log(this.state.putSkills))
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  handleDeleteEmployee = event => {
    event.preventDefault();
    axios.delete("http://localhost:8080/employees/" + this.state.deleteEmployeeID)
      .then((response) => {
        alert("Employee " + this.state.deleteEmployeeID + " deleted.");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleDeleteIDChange = event => {
    this.setState({ deleteEmployeeID: event.target.value });
  }

  handleGetSkillsChange = event => {
    this.setState({ getSkillsID: event.target.value });
  }

  handleGetSkills = event => {
    event.preventDefault();
    axios.get("http://localhost:8080/employees/" + this.state.getSkillsID + "/skills")
      .then((response) => {
        this.setState({ skills: JSON.stringify(response.data, null, '\t'), getSkillsClear: "visible" });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleSkillsClear = event => {
    event.preventDefault();
    this.setState({ skills: "", getSkillsClear: "invisible" });
  }

  handleGetSkillChange = event => {
    this.setState(prevState => {
      let getSkillData = Object.assign({}, prevState.getSkillData);
      getSkillData[event.target.name] = event.target.value;
      return { getSkillData };
    })
  }

  handleGetSkill = event => {
    event.preventDefault();
    axios.get("http://localhost:8080/employees/" + this.state.getSkillData.employeeId + "/skills/" + this.state.getSkillData.skillId)
      .then((response) => {
        this.setState({ skill: JSON.stringify(response.data, null, '\t'), skillClear: "visible" });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleSkillClear = event => {
    event.preventDefault();
    this.setState({ skill: "", getSkillClear: "invisible" });
  }

  handlePostSkill = event => {
    event.preventDefault();
    let postSkill = {};
    postSkill.id = this.state.postSkillData.skillId;
    let postField = {};
    postField.id = this.state.postSkillData.fieldId;
    postField.name = this.state.postSkillData.fieldName;
    postField.type = this.state.postSkillData.fieldType;
    postSkill.field = postField;
    postSkill.experience = this.state.postSkillData.experience;
    postSkill.summary = !('summary' in this.state.postSkillData) ? "" : this.state.postSkillData.summary;
    axios.post("http://localhost:8080/employees/" + this.state.postSkillData.employeeId + "/skills", postSkill)
      .then((response) => {
        this.setState({postSkill: JSON.stringify(response.data, null, '\t'), postSkillClear: "visible" })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handlePostSkillChange = event => {
    this.setState(prevState => {
      let postSkillData = Object.assign({}, prevState.postSkillData);
      postSkillData[event.target.name] = event.target.value;
      return { postSkillData };
    })
  }

  handlePostSkillClear = event => {
    event.preventDefault();
    this.setState({ postSkill: "", postSkillClear: "invisible" });
  }

  handlePutSkill = event => {
    event.preventDefault();
    let putSkill = {};
    putSkill.id = this.state.putSkillData.skillId;
    let putField = {};
    putField.id = this.state.putSkillData.fieldId;
    putField.name = this.state.putSkillData.fieldName;
    putField.type = this.state.putSkillData.fieldType;
    putSkill.field = putField;
    putSkill.experience = this.state.putSkillData.experience;
    putSkill.summary = !('summary' in this.state.putSkillData) ? "" : this.state.putSkillData.summary;
    axios.put("http://localhost:8080/employees/" + this.state.putSkillData.employeeId + "/skills/" + this.state.putSkillData.skillId, putSkill)
      .then((response) => {
        this.setState({putSkill: JSON.stringify(response.data, null, '\t'), putSkillClear: "visible" })
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handlePutSkillChange = event => {
    this.setState(prevState => {
      let putSkillData = Object.assign({}, prevState.putSkillData);
      putSkillData[event.target.name] = event.target.value;
      return { putSkillData };
    })
  }

  handlePutSkillClear = event => {
    event.preventDefault();
    this.setState({ putSkill: "", putSkillClear: "invisible" });
  }
  
  handleDeleteSkill = event => {
    event.preventDefault();
    axios.delete("http://localhost:8080/employees/" + this.state.deleteSkillData.employeeId + "/skills/" + this.state.deleteSkillData.skillId)
      .then((response) => {
        alert("Skill " + this.state.deleteSkillData.skillId + " deleted.");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  handleDeleteSkillChange = event => {
    this.setState(prevState => {
      let deleteSkillData = Object.assign({}, prevState.deleteSkillData);
      deleteSkillData[event.target.name] = event.target.value;
      return { deleteSkillData };
    })
  }

  render () {
    return (
    <div>
      <div class="title-card">
        <h1 class="title">Perficient Employee Data Center</h1>
        <h3 class="subtitle">Employee Skills Tracking Application</h3>
        <h4 class="name">James Worthington</h4>
      </div>

      <hr/>

      <div class="api-frame">
        <h3>Employee Queries</h3>
        {/* GET all employees */}
        <div class="form-row">
          <form onSubmit={this.handleGetEmployees}>
            <input type="submit" value="Get Employees" />
          </form>
          <form onSubmit={this.handleEmployeesClear}>
            <input type="submit" className={this.state.employeesClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.employees }
        </pre>
        <hr/>

        {/* GET one employee */}
        <div class="form-row">
          <form onSubmit={this.handleGetEmployee} class="form-row">
            <label><input type="text" name="id" placeholder="Employee ID" required onChange={this.handleGetIDChange}/></label>
            <input type="submit" value="Get Employee" />
          </form>
          <form onSubmit={this.handleEmployeeClear}>
            <input type="submit" className={this.state.employeeClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.employee }
        </pre>
        <hr/>

        {/* POST employee */}
        <div class="form-row">
          <form class="field-row" onSubmit={this.handlePostEmployeeSubmit} onChange={this.handlePostEmployeeChange}>
            <label><input type="text" name="id" placeholder="Employee ID" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="firstName" placeholder="First Name" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="lastName" placeholder="Last Name" required onChange={this.handlePostChange}/></label>
            <br/>
            <label><input type="text" name="addressId" placeholder="Address ID" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="street" placeholder="Street" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="suite" placeholder="Suite" onChange={this.handlePostChange}/></label>
            <label><input type="text" name="city" placeholder="City" required onChange={this.handlePostChange}/>
            </label>
            <label><input type="text" name="region" placeholder="Region" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="postal" placeholder="Postal" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="country" placeholder="Country" required onChange={this.handlePostChange}/></label>
            <br/>
            <label><input type="text" name="contactEmail" placeholder="Contact Email" onChange={this.handlePostChange}/></label>
            <label><input type="text" name="companyEmail" placeholder="Company Email" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="birthDate" placeholder="Birth Date" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="hiredDate" placeholder="Hired Date" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="role" placeholder="Role" required onChange={this.handlePostChange}/></label>
            <label><input type="text" name="businessUnit" placeholder="Business Unit" onChange={this.handlePostChange}/></label>
            {
              this.state.postSkills.map((val, idx) => {
                let skillId = `skill-${idx}`
                let fieldId = `field-${idx}`
                let fieldName = `fieldName-${idx}`
                let fieldType = `fieldType-${idx}`
                let experience = `experience-${idx}`
                let summary = `summary-${idx}`
                return (
                  <div key={idx} class="field-row">
                    <label><input type="text" name={skillId} data-id={idx} id={skillId} value={this.state.postSkills[idx].skillId} placeholder="Skill ID" className="skillId" required/></label>
                    <label><input type="text" name={fieldId} data-id={idx} id={fieldId} value={this.state.postSkills[idx].fieldId} placeholder="Field ID" className="fieldId" required/></label>
                    <label><input type="text" name={fieldName} data-id={idx} id={fieldName} value={this.state.postSkills[idx].fieldName} placeholder="Field Name" className="fieldName" required/></label>
                    <label><input type="text" name={fieldType} data-id={idx} id={fieldType} value={this.state.postSkills[idx].fieldType} placeholder="Field Type" className="fieldType" required/></label>
                    <label><input type="text" name={experience} data-id={idx} id={experience} value={this.state.postSkills[idx].experience} placeholder="Experience" className="experience" required/></label>
                    <label><input type="text" name={summary} data-id={idx} id={summary} value={this.state.postSkills[idx].summary} placeholder="Summary" className="summary"/></label>
                    <br/>
                  </div>
                )
              })
            }
            <br/>
            <div class="field-row">
              <div>
                <button type="button" onClick={this.addPostSkill}>Add Skill</button>
              </div>
              <div>
                <button type="button" onClick={this.removePostSkill} className={this.state.removePostSkill}>Remove Skill</button>
              </div>
            </div>
            <br/>
            <label><input type="text" name="assignedTo" placeholder="Assigned To" onChange={this.handlePostChange}/></label>
            <br/>
            <div class="submit-row">
              <input type="submit" value="Add Employee" />
              <form onClick={this.handlePostEmployeeClear}>
                <input type="submit" className={this.state.postEmployeeClear} value="Clear" />
              </form>
            </div>
          </form>
        </div>
        <pre>
          { this.state.postEmployee }
        </pre>
        <hr/>

        {/* PUT employee */}
        <div class="form-row">
          <form class="field-row" onSubmit={this.handlePutEmployeeSubmit} onChange={this.handlePutEmployeeChange}>
            <label><input type="text" name="id" placeholder="Employee ID" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="firstName" placeholder="First Name" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="lastName" placeholder="Last Name" required onChange={this.handlePutChange}/></label>
            <br/>
            <label><input type="text" name="addressId" placeholder="Address ID" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="street" placeholder="Street" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="suite" placeholder="Suite" onChange={this.handlePutChange}/></label>
            <label><input type="text" name="city" placeholder="City" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="region" placeholder="Region" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="postal" placeholder="Postal" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="country" placeholder="Country" required onChange={this.handlePutChange}/></label>
            <br/>
            <label><input type="text" name="contactEmail" placeholder="Contact Email" onChange={this.handlePutChange}/></label>
            <label><input type="text" name="companyEmail" placeholder="Company Email" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="birthDate" placeholder="Birth Date" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="hiredDate" placeholder="Hired Date" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="role" placeholder="Role" required onChange={this.handlePutChange}/></label>
            <label><input type="text" name="businessUnit" placeholder="Business Unit" onChange={this.handlePutChange}/></label>
            {
              this.state.putSkills.map((val, idx) => {
                let skillId = `skill-${idx}`
                let fieldId = `field-${idx}`
                let fieldName = `fieldName-${idx}`
                let fieldType = `fieldType-${idx}`
                let experience = `experience-${idx}`
                let summary = `summary-${idx}`
                return (
                  <div key={idx} class="field-row">
                    <label><input type="text" name={skillId} data-id={idx} id={skillId} value={this.state.putSkills[idx].skillId} placeholder="Skill ID" className="skillId" required/></label>
                    <label><input type="text" name={fieldId} data-id={idx} id={fieldId} value={this.state.putSkills[idx].fieldId} placeholder="Field ID" className="fieldId" required/></label>
                    <label><input type="text" name={fieldName} data-id={idx} id={fieldName} value={this.state.putSkills[idx].fieldName} placeholder="Field Name" className="fieldName" required/></label>
                    <label><input type="text" name={fieldType} data-id={idx} id={fieldType} value={this.state.putSkills[idx].fieldType} placeholder="Field Type" className="fieldType" required/></label>
                    <label><input type="text" name={experience} data-id={idx} id={experience} value={this.state.putSkills[idx].experience} placeholder="Experience" className="experience" required/></label>
                    <label><input type="text" name={summary} data-id={idx} id={summary} value={this.state.putSkills[idx].summary} placeholder="Summary" className="summary"/></label>
                    <br/>
                  </div>
                )
              })
            }
            <br/>
            <div class="field-row">
              <div>
                <button type="button" onClick={this.addPutSkill}>Add Skill</button>
              </div>
              <div>
                <button type="button" onClick={this.removePutSkill} className={this.state.removePutSkill}>Remove Skill</button>
              </div>
            </div>
            <br/>
            <label><input type="text" name="assignedTo" placeholder="Assigned To" onChange={this.handlePutChange}/></label>
            <br/>
            <div class="submit-row">
              <input type="submit" value="Update Employee" />
              <form onClick={this.handlePutEmployeeClear}>
                <input type="submit" className={this.state.putEmployeeClear} value="Clear" />
              </form>
            </div>
          </form>
        </div>
        <pre>
          { this.state.putEmployee }
        </pre>
        <hr/>

        {/* DELETE employee */}
        <div class="form-row">
          <form onSubmit={this.handleDeleteEmployee} class="form-row">
            <label><input type="text" name="id" placeholder="Employee ID" required onChange={this.handleDeleteIDChange}/></label>
            <input type="submit" value="Delete Employee" />
          </form>
        </div>

        <hr/>

        <h3>Skill Queries</h3>

        {/* GET all skills of an employee */}
        <div class="form-row">
          <form onSubmit={this.handleGetSkills} class="form-row">
            <label><input type="text" name="id" placeholder="Employee ID" required onChange={this.handleGetSkillsChange}/></label>
            <input type="submit" value="Get Skills" />
          </form>
          <form onSubmit={this.handleSkillsClear}>
            <input type="submit" className={this.state.getSkillsClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.skills }
        </pre>
        <hr/>

        {/* GET one skill */}
        <div class="form-row">
          <form onSubmit={this.handleGetSkill} onChange = {this.handleGetSkillChange} class="form-row">
            <label><input type="text" name="employeeId" placeholder="Employee ID" required/></label>
            <label><input type="text" name="skillId" placeholder="Skill ID" required/></label>
            <input type="submit" value="Get Skill" />
          </form>
          <form onSubmit={this.handleSkillClear}>
            <input type="submit" className={this.state.getSkillClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.skill }
        </pre>
        <hr/>

        {/* POST skill */}
        <div class="form-row">
          <form onSubmit={this.handlePostSkill} onChange = {this.handlePostSkillChange} class="form-row">
            <label><input type="text" name="employeeId" placeholder="Employee ID" required/></label>
            <label><input type="text" name="skillId" placeholder="Skill ID" required/></label>
            <label><input type="text" name="fieldId" placeholder="Field ID" required/></label>
            <label><input type="text" name="fieldName" placeholder="Field Name" required/></label>
            <label><input type="text" name="fieldType" placeholder="Field Type" required/></label>
            <label><input type="text" name="experience" placeholder="Experience" required/></label>
            <label><input type="text" name="summary" placeholder="Summary"/></label>
            <input type="submit" value="Add Skill" />
          </form>
          <form onSubmit={this.handlePostSkillClear}>
            <input type="submit" className={this.state.postSkillClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.postSkill }
        </pre>
        <hr/>

        {/* PUT skill */}
        <div class="form-row">
          <form onSubmit={this.handlePutSkill} onChange = {this.handlePutSkillChange} class="form-row">
            <label><input type="text" name="employeeId" placeholder="Employee ID" required/></label>
            <label><input type="text" name="skillId" placeholder="Skill ID" required/></label>
            <label><input type="text" name="fieldId" placeholder="Field ID" required/></label>
            <label><input type="text" name="fieldName" placeholder="Field Name" required/></label>
            <label><input type="text" name="fieldType" placeholder="Field Type" required/></label>
            <label><input type="text" name="experience" placeholder="Experience" required/></label>
            <label><input type="text" name="summary" placeholder="Summary"/></label>
            <input type="submit" value="Update Skill" />
          </form>
          <form onSubmit={this.handlePutSkillClear}>
            <input type="submit" className={this.state.putSkillClear} value="Clear" />
          </form>
        </div>
        <pre>
          { this.state.putSkill }
        </pre>
        <hr/>
        
        {/* DELETE skill */}
        <div class="form-row">
          <form onSubmit={this.handleDeleteSkill} onChange = {this.handleDeleteSkillChange} class="form-row">
            <label><input type="text" name="employeeId" placeholder="Employee ID" required/></label>
            <label><input type="text" name="skillId" placeholder="Skill ID" required/></label>
            <input type="submit" value="Delete Skill" />
          </form>
        </div>

      </div>
    </div>
    );
  }
}
   
export default App;