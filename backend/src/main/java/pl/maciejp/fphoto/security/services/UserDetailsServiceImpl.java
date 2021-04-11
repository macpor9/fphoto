package pl.maciejp.fphoto.security.services;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findFirstByLogin(username);
        if (!userRepository.existsByLogin(username))
                throw new UsernameNotFoundException("User Not Found with username: " + username);

        return UserDetailsImpl.build(user);
    }

}