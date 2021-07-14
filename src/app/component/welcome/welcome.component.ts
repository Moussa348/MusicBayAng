import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  activeTrack: number;
  sound: Howl = null;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.sound = new Howl({
      src: './assets/audio/ProdWelcome2.mp3',
      autoplay: true,
      loop: true,
    });
    this.activeTrack = this.sound.play();
  }

  fadeOut() {
    this.sound.fade(1, 0, 1000, this.activeTrack);
    this.router.navigate(['/home']);
  }
}
