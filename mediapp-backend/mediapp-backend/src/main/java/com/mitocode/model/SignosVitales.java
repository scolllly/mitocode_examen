package com.mitocode.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;



@Entity
@Table(name = "signos_vitales")
public class SignosVitales {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idSignosVitales;	
	
	@Column(name = "fecha", nullable = false)
	private LocalDateTime fecha;
	
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false, foreignKey = @ForeignKey(name = "FK_signosvitales_paciente"))
	private Paciente paciente;
	
	@NotNull
	@Column(name = "temperatura", nullable = false, length = 10)
	private String temperatura;
	
	@NotNull
	@Column(name = "pulso", nullable = false, length = 10)
	private String pulso;
	
	@NotNull
	@Column(name = "ritmo", nullable = false, length = 10)
	private String ritmo;

	public Integer getIdSignosVitales() {
		return idSignosVitales;
	}

	public void setIdSignosVitales(Integer idSignosVitales) {
		this.idSignosVitales = idSignosVitales;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public String getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}

	public String getPulso() {
		return pulso;
	}

	public void setPulso(String pulso) {
		this.pulso = pulso;
	}

	public String getRitmo() {
		return ritmo;
	}

	public void setRitmo(String ritmo) {
		this.ritmo = ritmo;
	}

	
	
}
