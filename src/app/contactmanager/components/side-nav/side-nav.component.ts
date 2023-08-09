import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isScreenSmall: boolean;

  users: Observable<User[]> | undefined;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) { 
    this.isScreenSmall = true;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall = state.matches;
          console.log("triggered")
        });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe(data => {
      console.log(data);
    });
  }
}
