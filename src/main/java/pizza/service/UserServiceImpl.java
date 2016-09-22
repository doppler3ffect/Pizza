package pizza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pizza.domain.PasswordType;
import pizza.domain.User;
import pizza.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Daniel Keiss on 11.09.2016.
 */
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public boolean isUsernameValid(String username) {
		return getUserByUsername(username) != null;
	}

	@Override
	public boolean isUsernameAndPasswordValid(String username, String password) {
		User user = getUserByUsername(username);
		if (user != null) {
			return checkPassword(password, user);
		}
		return false;
	}

	private boolean checkPassword(String password, User user) {
		if (PasswordType.PLAIN.equals(user.getPasswordType())) {
			return user.getPassword().equals(password);
		} else if (PasswordType.ENCRYPTED.equals(user.getPasswordType())) {
			throw new IllegalArgumentException("Not implemented yet!");
		}
		throw new IllegalArgumentException("No Password Type set!");
	}

	@Override
	public boolean isAdmin(String username) {
		User user = getUserByUsername(username);
		return user.isAdmin();
	}

	@Override
	public List<User> getUsers() {
		List<User> users = new ArrayList<>();
		userRepository.findAll().forEach(users::add);
		return users;
	}

	private User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}

}
