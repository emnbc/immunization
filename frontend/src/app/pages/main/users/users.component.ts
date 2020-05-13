import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService, Param} from '../../../shared/http.service';
import { User } from '../../../models/user.model';
import { UserModalComponent } from './user-modal/user-modal.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(UserModalComponent, {static: false}) modal: UserModalComponent;

  users: User[] = [];
  page: number = 1;
  size: number = 10;
  totalCount: number = null;
  loading: boolean = false;
  changing: boolean = false;

  sortingState: string = null;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getUsers(this.page, this.size);
  }

  getUsers(page: number, size?: number): void {
    this.page = page;

    let paramsList: Param[] = [
      {key: 'size', value: size.toString()},
      {key: 'page', value: this.page.toString()},
      {key: 'sort', value: this.sortingState}
    ];

    this.http.get<User[]>('users', paramsList).subscribe(res => {
      this.users = User.initArray(res.body);
      this.totalCount = +res.headers.get('X-Total-Count');
      this.changing = this.loading = false;
    }, () => {
      this.changing = this.loading = false;
    });
  }

  createUser(user: User): void {
    this.http.post<User>('register', user).subscribe(() => {
      this.modal.close();
      this.modal.sendLoading = false;
      this.changing = true;
      this.getUsers(this.page, this.size);
    }, err => {
      this.modal.sendLoading = false;
      if(err.status === 409) {
        this.modal.errorMessage = 'User already exist';
      }
    });
  }

  updateUser(user: User) {
    this.http.put<User>('users', user._id, user).subscribe(() => {
      this.modal.close();
      this.modal.sendLoading = false;
      this.changing = true;
      this.getUsers(this.page, this.size);
    }, err => {
      this.modal.sendLoading = false;
      if(err.status === 409) {
        this.modal.errorMessage = 'User already exist';
      }
    });
  }

  changeSorting(result: string) {
    this.changing = true;
    this.sortingState = result;
    this.getUsers(this.page, this.size);
  }

  pageChange(page: number) {
    this.changing = true;
    this.getUsers(page, this.size);
  }

  handleQueryUser(user: User) {
    if(user._id) {
      // Update
      this.updateUser(user);
    } else {
      // Create
      this.createUser(user);
    }
  }

  openModal(vaccine?: User): void {
    this.modal.open(vaccine);
  }

  trackById(user: User) {
    return user._id;
  }

}
