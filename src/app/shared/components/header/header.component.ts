import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { UserRole } from '../../enums/user-role.enum';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  role!: UserRole;

  private readonly itemsUser = [
    {
      label: 'Actions',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Hotel',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Add',
              icon: 'pi pi-fw pi-bookmark',
              command: () => {
                this.router.navigate(['user', 'hotel']);
              },
            },
            {
              label: 'List',
              icon: 'pi pi-fw pi-bookmark',
              command: () => {
                this.router.navigate(['user', 'hotellist']);
              },
            },
          ],
        },

        {
          separator: true,
        },
        {
          label: 'Edit User Data',
          icon: 'pi pi-fw pi-external-link',
          command: () => {
            this.router.navigate(['user', 'profile']);
          },
        },
      ],
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.logOut();
      },
    },
  ];

  private readonly itemsAdmin = [
    {
      label: 'Actions',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-fw pi-plus',
          command: () => {
            this.router.navigate(['admin', 'adminuserlist']);
          },
        },

        {
          separator: true,
        },
        {
          label: 'Edit Administrator Data',
          icon: 'pi pi-fw pi-external-link',
          command: () => {
            this.router.navigate(['admin', 'adminprofile']);
          },
        },
      ],
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.logOut();
      },
    },
  ];

  private readonly itemsNoRole = [];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUserRole.subscribe((role: UserRole) => {
      this.role = role;

      if (role === UserRole.ROLE_USER) {
        this.items = this.itemsUser;
      } else if (role === UserRole.ROLE_ADMIN) {
        this.items = this.itemsAdmin;
      } else {
        this.items = this.itemsNoRole;
      }

      console.log('role: ', role);
    });
  }

  private logOut(): void {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['login']);
  }
}
