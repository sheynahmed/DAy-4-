import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Carousel } from "../carousel/carousel";
import { Accordion } from "../accordion/accordion";

@Component({
  selector: 'app-home',
  imports: [RouterLink, Carousel, Accordion],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
