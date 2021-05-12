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
public class Address implements Serializable {

	private @Id String id;
	private String street;
	private String suite;
	private String city;
    private String region;
    private String postal;
    private String country;

	private Address() {}

	public Address(String id, String street, String suite, String city, String region, String postal, String country) {
		this.id = id;
		this.street = street;
		this.suite = suite;
		this.city = city;
		this.region = region;
		this.postal = postal;
		this.country = country;
		/*
        this.id = newAddress.getString("id");
		this.street = newAddress.getString("street");
		this.suite = newAddress.getString("suite");
		this.city = newAddress.getString("city");
		this.region = newAddress.getString("region");
		this.postal = newAddress.getString("postal");
		this.country = newAddress.getString("country");
		*/
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Address address = (Address) o;
		return Objects.equals(id, address.id);
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
	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	@Column
	public String getSuite() {
		return suite;
	}

	public void setSuite(String suite) {
		this.suite = suite;
	}

	@Column
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@Column
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column
	public String getPostal() {
		return postal;
	}

	public void setPostal(String postal) {
		this.postal = postal;
	}

	@Column
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
}