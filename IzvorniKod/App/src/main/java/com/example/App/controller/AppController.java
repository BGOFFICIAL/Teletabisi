package com.example.App.controller;

import com.example.App.objects.User;
import com.example.App.service.AppService;
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
    public String registerUser(@ModelAttribute("user") User user) {
        System.out.println(user);
        User registeredUser = this.userService.registerUser(user.getUsername(), user.getPassword(), user.getEmail(), user.getOIB());
        return registeredUser == null ? "error_page" : "redirect:/login";
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
