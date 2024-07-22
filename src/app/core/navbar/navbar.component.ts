import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBaby, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../auth/enums/role.enum';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'mn-navbar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        MenubarModule,
        BadgeModule,
        AvatarModule,
        InputTextModule,
        RippleModule,
        CommonModule,
        IconFieldModule,
        InputIconModule,
        FontAwesomeModule,
        SearchBarComponent,
        ButtonModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    animations: [
        trigger('toggleSearch', [
            state(
                'hidden',
                style({
                    opacity: 0,
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visible',
                style({
                    opacity: 1,
                    height: '*',
                })
            ),
            transition('hidden <=> visible', [animate('300ms ease-in-out')]),
        ]),
    ],
})
export class NavbarComponent implements OnInit {
    showSearchBar = false;
    userRole: string | null = '';
    items: MenuItem[] | undefined;
    adminItems: MenuItem[] = [
        {
            label: 'Tableau de bord',
            id: 'dashboard',
            icon: 'pi pi-home',
        },
        {
            label: 'Crèches',
            id: 'nursery',
            icon: 'pi pi-star',
            url: 'nurseries',
        },

        {
            label: 'Les enfants',
            id: 'children',
            faIcon: faBaby,
        },

        {
            label: 'Les parents',
            id: 'parents',
            icon: 'pi pi-users',
        },

        {
            label: 'Les activités',
            id: 'activities',
            icon: 'pi pi-book',
            command: this.toggleSearchBar,
        },
    ];
    ownerItems: MenuItem[] = [
        {
            label: 'Tableau de bord',
            id: 'dashboard',
            icon: 'pi pi-home',
        },
        {
            label: 'Crèches',
            id: 'nursery',
            icon: 'pi pi-star',
            url: 'nurseries',
        },

        {
            label: 'Les enfants',
            id: 'children',
            faIcon: faBaby,
        },

        {
            label: 'Les parents',
            id: 'parents',
            icon: 'pi pi-users',
        },

        {
            label: 'Les activités',
            id: 'activities',
            icon: 'pi pi-book',
        },
    ];
    userItems: MenuItem[] = [
        {
            label: 'Les enfants',
            id: 'children',
            faIcon: faBaby,
        },

        {
            label: 'Les parents',
            id: 'parents',
            icon: 'pi pi-users',
        },

        {
            label: 'Les activités',
            id: 'activities',
            icon: 'pi pi-book',
        },
    ];
    faBaby = faBaby;
    faHouse = faHouse;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();

        switch (this.userRole) {
            case Role.Admin:
                this.items = this.adminItems;
                break;
            case Role.Owner:
                this.items = this.ownerItems;
                break;
            case Role.User:
                this.items = this.userItems;
                break;
        }
    }

    toggleSearchBar() {
        console.log("J'ai cliqué chef");
        this.showSearchBar = !this.showSearchBar;
        console.log(this.showSearchBar);
    }

    logout() {
        this.authService.logout();
    }
}
