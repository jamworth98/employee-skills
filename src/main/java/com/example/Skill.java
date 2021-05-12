package com.example;

import java.io.Serializable;

//import org.json.JSONArray;
//import org.json.JSONObject;

import java.util.Objects;
import java.util.HashMap;

import javax.persistence.*;

@Table
@Entity
public class Skill implements Serializable {
	private String id;
	private Field field;
	private int experience;
	private String summary;

	private Skill() {}

	public Skill(String id, Field field, int experience, String summary) {
		this.id = id;
		this.field = field;
		this.experience = experience;
		this.summary = summary;
		/*
        this.id = newSkill.getString("id");
		this.field = new Field(newSkill.getJSONObject("field"));
		this.experience = newSkill.getInt("experience");
		this.summary = newSkill.getString("summary");
		*/
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Skill skill = (Skill) o;
		return Objects.equals(id, skill.id);
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

	@ManyToOne(targetEntity = Field.class)
	@JoinColumn(name="field_id")
	public Field getField() {
		return field;
	}

	public void setField(Field field) {
		this.field = field;
	}

	@Column
	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	@Column
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}
}