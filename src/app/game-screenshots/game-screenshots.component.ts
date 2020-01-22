import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { GameService } from '../game.service';
import { Screenshot } from '../screenshot';

@Component({
  selector: 'app-game-screenshots',
  templateUrl: './game-screenshots.component.html',
  styleUrls: ['./game-screenshots.component.scss']
})
export class GameScreenshotsComponent implements OnInit {

  @Input() gameId: number;

  galleryOptions: NgxGalleryOptions[] = [
    {
        width: '400px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageSize: NgxGalleryImageSize.Contain,
        imagePercent: 100,
        imageDescription: true,
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true
    },
    {
      breakpoint: 420,
      width: '100%'
    }
  ];
  
  galleryImages: NgxGalleryImage[] = [];
  
  constructor(
    private gameService: GameService,) { }

  ngOnInit() {
    this.getScreenshots();
  }

  getScreenshots(): void {
    this.gameService.getScreenshotsForGame(this.gameId).subscribe(
      screenshots => {
        this.galleryImages = this.shuffle(screenshots
        .map(screenshot => Object.assign(new Screenshot(), screenshot))
        .map(ss => new NgxGalleryImage({
            small: ss.getUrl(),
            medium: ss.getUrl(),
            big: ss.getUrl(),
            description: ss.user_name + (ss.description?": " + ss.description:"")
          })
        ));
      }
    );
  }

  shuffle(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
