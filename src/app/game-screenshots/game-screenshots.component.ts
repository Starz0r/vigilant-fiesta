import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery-9';
import { GameService } from '../service/game.service';
import { Screenshot } from '../model/screenshot';

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
        imageAutoPlayPauseOnHover: true,
        thumbnailsAutoHide: true,
        previewCloseOnClick: true,
        previewAutoPlay: true,
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
        if (screenshots.length > 0) {
          this.galleryImages = this.shuffle(screenshots
          .map(screenshot => Object.assign(new Screenshot(), screenshot))
          .map(ss => new NgxGalleryImage({
              small: ss.getUrl(),
              medium: ss.getUrl(),
              big: ss.getUrl(),
              description: ss.user_name + (ss.description?": " + ss.description:"")
            })
          ));
        } else {
          this.galleryImages = [new NgxGalleryImage({
            small: '/assets/images/no-image.png',
            medium: '/assets/images/no-image.png',
            big: '/assets/images/no-image.png',
            description: 'No screenshots yet! Why not add one?'
          })];
        }
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
