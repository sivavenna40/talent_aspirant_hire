package com.core.corenuts.service;

import com.core.corenuts.entity.Interviewer;
import com.core.corenuts.repo.InterviewerRepo;
import com.core.corenuts.repo.UserRepository;
import com.core.corenuts.request.SignupRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
@Slf4j
public class InterviewerService {
    @Autowired
    private InterviewerRepo interviewerRepo;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public Interviewer saveInterviewer(Interviewer interviewer) {
        if (!userRepository.existsByEmail(interviewer.getInterviewerEmail())) {
            Set<String> roles = new HashSet<String>();
            roles.add("Interviewer");
            SignupRequest interviewerRole = SignupRequest.builder()
                    .username(interviewer.getInterviewerName())
                    .email(interviewer.getInterviewerEmail())
                    .phoneNumber(interviewer.getInterviewerMobileNumber())
                    .password(interviewer.getInterviewerMobileNumber())
                    .roles(roles)
                    .build();
            userService.register(interviewerRole);
        }
        Interviewer savedInterviewer = interviewerRepo.save(interviewer);
        log.info("Interviewer successfully saved:{}", interviewer);
        return savedInterviewer;
    }

    public void deleteInterviewerById(int interviewerId) {
        interviewerRepo.deleteById(interviewerId);
        log.info("interviewer with id {} deleted successfully", interviewerId);
    }

    public List<Interviewer> findInterviewers() {
        List<Interviewer> interviewers = interviewerRepo.findAll();
        log.info("interviewers fetched successfully :{}", interviewers);
        return interviewers;
    }

    public Interviewer findInterviewerById(int interviewerId) {
        Optional<Interviewer> interviewer = interviewerRepo.findById(interviewerId);
        if (interviewer.isPresent()) {
            log.info("interviewer with id {} fetched successfully:{}", interviewerId, interviewer);
            return interviewer.get();
        }
        return null;
    }


    public Interviewer findByInterviewerEmail(String interviewerEmail) {
        Interviewer interviewer = interviewerRepo.findByInterviewerEmail(interviewerEmail);
        log.info("interviewer with email {} successfully fetched :{}",interviewer, interviewer);
        return interviewer;
    }
}
