package com.core.corenuts.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="interview_rating_point")
@Builder
public class InterviewRatingPoint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "interview_rating_point_id")
	private Integer interviewRatingPointId;

	@Column(name="rating_point")
	private Integer  ratingPoint;

	@Column(name = "rating_description")
	private String ratingDescription;

}
