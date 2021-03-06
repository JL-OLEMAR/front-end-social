import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';
@Component({
  selector: 'sended',
  templateUrl: './sended.component.html',
  providers: [MessageService, FollowService, UserService],
})
export class SendedComponent implements OnInit {
  public title: string;
  public url: string;
  public status: string;
  public messages: Message[];
  public identity;
  public token;
  public follows;
  public pages;
  public page;
  public total;
  public next_page;
  public prev_page;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Mensajes enviados';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe((params) => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      // Devolver listado de usuarios
      this.getMessages(this.token, this.page);
    });
  }

  getMessages(token, page) {
    this._messageService.getEmitMessages(token, page).subscribe(
      (response) => {
        if (response.messages) {
          this.messages = response.messages;
          this.total = response.total;
          this.pages = response.pages;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
