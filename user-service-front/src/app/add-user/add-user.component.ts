// add-user.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service.service'; // Adjust the path as needed
import { User } from '../User.model'; // Adjust the path as needed

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;

      this.userService.addUser(newUser).subscribe(
        (addedUser) => {
          console.log('User added successfully:', addedUser);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
}
