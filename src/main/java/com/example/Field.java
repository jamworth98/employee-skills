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
public class Field implements Serializable {

	private @Id String id;
	private String name;
	private String type;

	private Field() {}

    public Field(String id, String name, String type) {
        this.id = id;
		this.name = name;
		this.type = type;
		/*
		this.id = newField.getString("id");
		this.name = newField.getString("name");
		this.type = newField.getString("type");
		*/
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Field field = (Field) o;
		return Objects.equals(id, field.id);
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
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}