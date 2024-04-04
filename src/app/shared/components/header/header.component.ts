import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { UserRole } from '../../enums/user-role.enum';
import { AuthService } from '../../services/auth-service/auth.service';
import { RegistrationServiceService } from '../../services/registration-service/registration-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  role!: UserRole | null;

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

  private readonly itemsNoRole = [
    {
      label: 'Log In',
      icon: 'pi pi-fw pi-file',
      command: () => {
        this.router.navigate(['login']);
      },
    },
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private regService: RegistrationServiceService
  ) {}

  ngOnInit() {
    this.authService.currentUserRole.subscribe((role: UserRole | null) => {
      this.role = role;

      if (role === null) {
        const roleFromLS = this.localStorageService.getUserRole();
        this.role =
          roleFromLS === null || roleFromLS === undefined
            ? UserRole.NONE
            : UserRole[roleFromLS as UserRole];
      }

      this.setHeader();
      console.log('role: ', role);
    });

    this.setHeader();
  }

  private setHeader(): void {
    if (this.role === UserRole.ROLE_USER) {
      this.items = this.itemsUser;
    } else if (this.role === UserRole.ROLE_ADMIN) {
      this.items = this.itemsAdmin;
    } else {
      this.items = this.itemsNoRole;
    }
  }

  private logOut(): void {
    this.regService.logOut();
  }
}
