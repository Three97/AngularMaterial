import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public isScreenSmall: boolean = true;

  users: Observable<User[]>;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit(): void {
    this.breakpointObserver
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall = state.matches;
        });

    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }
}
