package com.example;

import java.util.List;
import java.util.regex.Pattern;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
class Controller {

  @Autowired
  private final PerficientRepository repository;

  private Pattern uuidFormat = Pattern.compile("[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}");
  private Pattern regionFormat = Pattern.compile("[A-Z]{2,3}");
  private Pattern countryFormat = Pattern.compile("[A-Z]{2}");

  ArrayList<String> roles;
  ArrayList<String> businessUnits;

  Controller(PerficientRepository repository) {
    this.repository = repository;
    this.roles = new ArrayList<String>();
    this.businessUnits = new ArrayList<String>();
    roles.add("Technical Consultant");
    roles.add("Project Manager");
    roles.add("Director");
    roles.add("Chief");
    businessUnits.add("Digital Experience Group");
    businessUnits.add("Adobe");
    businessUnits.add("IBM NBU");
    businessUnits.add("API Management");
  }

  // GET ALL EMPLOYEES
  @CrossOrigin(origins = "*")
  @GetMapping("/employees")
  ResponseEntity<Object> allEmployees() {
    String numEmployees = repository.count() + "";
    HttpHeaders headers = new HttpHeaders();
    headers.add("X-Total-Count", numEmployees);
    return new ResponseEntity<>(repository.findAll(), headers, HttpStatus.OK);
  }

  // GET ONE EMPLOYEE
  @CrossOrigin(origins = "*")
  @GetMapping("/employees/{employeeId}")
  ResponseEntity<Object> oneEmployee(@PathVariable String employeeId) {
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(repository.findById(employeeId), HttpStatus.OK);
  }

  // GET ALL OF ONE EMPLOYEE'S SKILLS
  @CrossOrigin(origins = "*") 
  @GetMapping("/employees/{employeeId}/skills")
  ResponseEntity<Object> allSkills(@PathVariable String employeeId) {
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    Skill[] employeeSkills = repository.findById(employeeId).get().getSkills();
    HttpHeaders headers = new HttpHeaders();
    headers.add("X-Total-Count", employeeSkills.length + "");
    return new ResponseEntity<>(employeeSkills, HttpStatus.OK);
  }

  // GET ONE OF AN EMPLOYEE'S SKILLS
  @CrossOrigin(origins = "*")
  @GetMapping("/employees/{employeeId}/skills/{skillId}")
  ResponseEntity<Object> oneSkill(@PathVariable String employeeId, @PathVariable String skillId) {
    if (!uuidFormat.matcher(employeeId).matches() || !uuidFormat.matcher(skillId).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    Skill[] employeeSkills = repository.findById(employeeId).get().getSkills();
    for (int i = 0; i < employeeSkills.length; i++) {
      if (employeeSkills[i].getId().equals(skillId)) {
        return new ResponseEntity<>(employeeSkills[i], HttpStatus.OK);
      }
    }
    return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
  }
  
  // ADD AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @PostMapping(value = "/employees", consumes = "application/json", produces = "application/json")
  ResponseEntity<Object> newEmployee(@RequestBody Employee newEmployee) {
    String employeeId = newEmployee.getId();
    String addressId = newEmployee.getAddress().getId();
    String region = newEmployee.getAddress().getRegion();
    String country = newEmployee.getAddress().getCountry();
    String role = newEmployee.getRole();
    String businessUnit = newEmployee.getBusinessUnit();
    if (repository.existsById(employeeId) || !uuidFormat.matcher(employeeId).matches()
        || !uuidFormat.matcher(addressId).matches() || !regionFormat.matcher(region).matches()
        || !countryFormat.matcher(country).matches() 
        || !roles.contains(role) || (!businessUnit.equals("") && !businessUnits.contains(businessUnit))) {
      return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    Skill[] skills = newEmployee.getSkills();
    Skill[] newSkills = new Skill[skills.length];
    for (int i = 0; i < skills.length; i++) {
      String skillId = skills[i].getId();
      String fieldId = skills[i].getField().getId();
      int experience = skills[i].getExperience();
      if (!uuidFormat.matcher(skillId).matches() || !uuidFormat.matcher(fieldId).matches() || experience < 0) {
        return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
    return new ResponseEntity<>(repository.save(newEmployee), HttpStatus.CREATED);
  }

  // ADD A SKILL TO AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @PostMapping(value = "/employees/{employeeId}/skills", consumes = "application/json", produces = "application/json")
  ResponseEntity<Object> newSkill(@RequestBody Skill newSkill, @PathVariable String employeeId) {
    if (!uuidFormat.matcher(employeeId).matches() || !uuidFormat.matcher(newSkill.getId()).matches() 
        || !uuidFormat.matcher(newSkill.getField().getId()).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    if (newSkill.getExperience() < 0) {
      return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    Employee employee = repository.findById(employeeId).get();
    Skill[] skills = employee.getSkills();
    Skill[] newSkills = new Skill[skills.length + 1];
    boolean found = false;
    for (int i = 0; i < skills.length; i++) {
      newSkills[i] = skills[i];
      if (newSkill.getId().equals(skills[i].getId())) {
        return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
    newSkills[newSkills.length - 1] = newSkill;

    employee.setSkills(newSkills);
    repository.save(employee);
    return new ResponseEntity<>(newSkill, HttpStatus.CREATED);
  }

  // UPDATE AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @PutMapping("/employees/{employeeId}")
  ResponseEntity<Object> replaceEmployee(@RequestBody Employee newEmployee, @PathVariable String employeeId) {
    
    String addressId = newEmployee.getAddress().getId();
    String region = newEmployee.getAddress().getRegion();
    String country = newEmployee.getAddress().getCountry();
    String role = newEmployee.getRole();
    String businessUnit = newEmployee.getBusinessUnit();
    if (!uuidFormat.matcher(employeeId).matches() || !uuidFormat.matcher(addressId).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    if (!regionFormat.matcher(region).matches() || !countryFormat.matcher(country).matches() 
        || !roles.contains(role) || (!businessUnit.equals("") && !businessUnits.contains(businessUnit))) {
      return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    Skill[] skills = newEmployee.getSkills();
    for (int i = 0; i < skills.length; i++) {
      String skillId = skills[i].getId();
      String fieldId = skills[i].getField().getId();
      int experience = skills[i].getExperience();
      if (!uuidFormat.matcher(skillId).matches() || !uuidFormat.matcher(fieldId).matches()) {
        return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
      }
      if (experience < 0) {
        return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }
    Object putEmployee = repository.findById(employeeId)
      .map(employee -> {
        employee.setFirstName(newEmployee.getFirstName());
        employee.setLastName(newEmployee.getLastName());
        employee.setAddress(newEmployee.getAddress());
        employee.setContactEmail(newEmployee.getContactEmail());
        employee.setCompanyEmail(newEmployee.getCompanyEmail());
        employee.setBirthDate(newEmployee.getBirthDate());
        employee.setHiredDate(newEmployee.getHiredDate());
        employee.setRole(newEmployee.getRole());
        employee.setBusinessUnit(newEmployee.getBusinessUnit());
        employee.setSkills(newEmployee.getSkills());
        employee.setAssignedTo(newEmployee.getAssignedTo());
        return repository.save(employee);
      })
      .orElseGet(() -> {
        newEmployee.setId(employeeId);
        return repository.save(newEmployee);
      });
    return new ResponseEntity<>(putEmployee, HttpStatus.OK);
  }

  // UPDATE A SKILL OF AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @PutMapping("/employees/{employeeId}/skills/{skillId}")
  ResponseEntity<Object> replaceSkill(@RequestBody Skill newSkill, @PathVariable String employeeId, @PathVariable String skillId) {
    System.out.println(employeeId);
    System.out.println(newSkill.getId());
    System.out.println(skillId);
    System.out.println(newSkill.getField().getId());
    if (!uuidFormat.matcher(employeeId).matches() || !uuidFormat.matcher(newSkill.getId()).matches() 
        || !uuidFormat.matcher(skillId).matches() || !uuidFormat.matcher(newSkill.getField().getId()).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    if (newSkill.getExperience() < 0) {
      return new ResponseEntity<>("Invalid Perficient employee data sent to server.", HttpStatus.UNPROCESSABLE_ENTITY);
    }
    Employee employee = repository.findById(employeeId).get();
    Skill[] skills = employee.getSkills();
    Skill[] newSkills = new Skill[skills.length];
    boolean found = false;
    for (int i = 0; i < skills.length; i++) {
      if (!found && skills[i].getId().equals(skillId)) {
        found = true;
        newSkills[i] = newSkill;
      } else {
        newSkills[i] = skills[i];
      }
    }
    if (!found) {
      return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    employee.setSkills(newSkills);
    repository.save(employee);
    return new ResponseEntity<>(newSkill, HttpStatus.OK);
  }

  // DELETE AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @DeleteMapping("/employees/{employeeId}")
  ResponseEntity<Object> deleteEmployee(@PathVariable String employeeId) {
    if (!uuidFormat.matcher(employeeId).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    repository.deleteById(employeeId);
    return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
  }

  // DELETE A SKILL OF AN EMPLOYEE
  @CrossOrigin(origins = "*")
  @DeleteMapping("/employees/{employeeId}/skills/{skillId}")
  ResponseEntity<Object> deleteSkill(@PathVariable String employeeId, @PathVariable String skillId) {
    if (!uuidFormat.matcher(employeeId).matches() || !uuidFormat.matcher(skillId).matches()) {
      return new ResponseEntity<>("Invalid ID format.", HttpStatus.BAD_REQUEST);
    }
    if (!repository.existsById(employeeId)) {
      return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    Employee employee = repository.findById(employeeId).get();
    Skill[] skills = employee.getSkills();
    Skill[] newSkills = new Skill[skills.length - 1];
    boolean found = false;
    for (int i = 0, k = 0; i < skills.length; i++) {
      if (!found && skills[i].getId().equals(skillId)) {
        found = true;
      } else {
        newSkills[k++] = skills[i];
      }
    }
    if (!found) {
      return new ResponseEntity<>("Technical skill or Perficient employee not found.", HttpStatus.NOT_FOUND);
    }
    employee.setSkills(newSkills);
    repository.save(employee);
    return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
  }
}