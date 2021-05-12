package com.example;

import java.io.Serializable;

//import org.json.JSONArray;
//import org.json.JSONObject;

import java.util.Objects;
import java.util.HashMap;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.*;

@Entity
public class Employee implements Serializable {

	private String id;
	private String firstName;
	private String lastName;
	private Address address;
    private String contactEmail;
    private String companyEmail;
    private String birthDate;
    private String hiredDate;
	private String role;
	private String businessUnit;
	private Skill[] skills;
	private String assignedTo;

	private Employee() {}

	public Employee(String id, String firstName, String lastName, Address address,
					String contactEmail, String companyEmail, String birthDate,
					String hiredDate, String role, String businessUnit, Skill[] skills,
					String assignedTo) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.contactEmail = contactEmail;
		this.companyEmail = companyEmail;
		this.birthDate = birthDate;
		this.hiredDate = hiredDate;
		this.role = role;
		this.businessUnit = businessUnit;
		this.skills = skills;
		this.assignedTo = assignedTo;
		/*
		this.id = newEmployee.getString("id");
		this.firstName = newEmployee.getString("firstName");
		this.lastName = newEmployee.getString("lastName");
		this.address = new Address(newEmployee.getJSONObject("address"));
		this.contactEmail = newEmployee.getString("contactEmail");
		this.companyEmail = newEmployee.getString("companyEmail");
		this.birthDate = newEmployee.getString("birthDate");
		this.hiredDate = newEmployee.getString("hiredDate");
		this.role = newEmployee.getString("role");
		this.businessUnit = newEmployee.getString("businessUnit");
		JSONArray skillsArray = newEmployee.getJSONArray("skills");
		this.skills = new Skill[skillsArray.length()];
		for (int i = 0; i < skillsArray.length(); i++) {
			this.skills[i] = new Skill(skillsArray.getJSONObject(i));
		}
		this.assignedTo = newEmployee.getString("assignedTo");
		*/
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Employee employee = (Employee) o;
		return Objects.equals(id, employee.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Column
	@Id
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@ManyToOne(targetEntity = Address.class)
	@JoinColumn(name="address_id")
	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Column
	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	@Column
	public String getCompanyEmail() {
		return companyEmail;
	}

	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}

	@Column
	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	@Column
	public String getHiredDate() {
		return hiredDate;
	}

	public void setHiredDate(String hiredDate) {
		this.hiredDate = hiredDate;
	}

	@Column
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Column
	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	@Column
	@Lob
	public Skill[] getSkills() {
		return skills;
	}

	public void setSkills(Skill[] skills) {
		this.skills = skills;
	}

	@Column
	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	@Override
	public String toString() {
		return "Employee{" + "id=" + id + ", " + firstName + '}';
	}
}