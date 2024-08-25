import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";


import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgForOf, SubscriberCardComponent, RouterLink, AsyncPipe, JsonPipe, ImgUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
