package com.teletabisi.MedInstitutionApp.security.auth.register;


import com.teletabisi.MedInstitutionApp.entity.User;
import com.teletabisi.MedInstitutionApp.security.auth.register.service.AppService;
import com.teletabisi.MedInstitutionApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AppController {
    @Autowired
    private AppService userService;

    @Autowired
    private UserRepository repo;
    public AppController() {
    }

    @GetMapping({"/register"})
    public String registerPage(Model model) {
        User user = new User();
        model.addAttribute("registerRequest", user);
        return "register_proba";
    }

    @GetMapping({"/login"})
    public String loginPage(Model model) {
        User user = new User();
        model.addAttribute("loginRequest", user);
        return "login_proba";
    }

    @PostMapping({"/register"})
    public String registerUser(@ModelAttribute("user") User user, Model model) {

        System.out.println(user);
        User registeredUser = this.userService.registerUser(user.getUsername(), user.getFirstname(), user.getLastname(), user.getGender(), user.getDateOfBirth(), user.getPassword(), user.getEmail(), user.getOIB());

        if (repo.findFirstByUsername(user.getUsername()).isPresent()) {
            model.addAttribute("errorUsername", "Korisnik sa korisničkim imenom: " + user.getUsername() + " već postoji");
        }
        if (repo.findFirstByEmail(user.getEmail()).isPresent()) {
            model.addAttribute("errorEmail", "Korisnik sa email-om: " + user.getEmail() + " već postoji");
        }
        if (repo.findFirstByOIB(user.getOIB()).isPresent()) {
            model.addAttribute("errorOIB1", "Korisnik sa OIB-om: " + user.getOIB() + " već postoji");
        }
        if (user.getOIB().length()!=11) {
            model.addAttribute("errorOIB2", "OIB mora imati 11 znamenki");
        }

        return registeredUser == null ? "register_proba" : "redirect:/login";
    }

    @PostMapping({"/login"})
    public String login(@ModelAttribute("user") User user, Model model) {
        System.out.println(user);
        User authenticated = this.userService.authenticate(user.getUsername(), user.getPassword());
        if (authenticated != null) {
            model.addAttribute("userUsername", authenticated.getUsername());
            return "main_page";
        } else {
            return "error_page";
        }
    }
}
