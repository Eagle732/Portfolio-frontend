import { Component, OnInit } from '@angular/core';
import { Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.sass']
})
export class AllocationsComponent implements OnInit, AfterViewInit {

    // a reference to the canvas element from our template
    @ViewChild('canvas') public canvas: ElementRef;
    @Input() public width = 400;
    @Input() public height = 400;
    private cx: CanvasRenderingContext2D;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        Highcharts.chart('return-container', {
            title: {
                text: 'Your returns, 2007-2017'
            },
            subtitle: {
                text: 'Source: Zettamine.com'
            },
            yAxis: {
                title: {
                    text: 'returns'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: [{
                type: 'line',
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });


        Highcharts.chart('investment-container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Your Investments'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'MSFT',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }, {
                    name: 'TXN',
                    y: 11.84
                }, {
                    name: 'ABBV',
                    y: 10.85
                }, {
                    name: 'GOOGLE',
                    y: 4.67
                }]
            }]
        });
    }


    formatLabel(value: number | null) {
        if (!value) {
          return 0;
        }
    
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
    
        return value;
      }









    // public ngAfterViewInit(): void {
    //     // get the context
    //     const canvasE1: HTMLCanvasElement = this.canvas.nativeElement;
    //     this.cx = canvasE1.getContext('2d');
    //     // set the width and height
    //     canvasE1.width = this.width;
    //     canvasE1.height = this.height;
    //     // set some default properties about the line
    //     this.cx.lineWidth = 3;
    //     this.cx.lineCap = 'round';
    //     this.cx.strokeStyle = '#000';
    //     this.captureEvents(canvasE1);
    // }

    // private captureEvents(canvasE1: HTMLCanvasElement) {
    // // this will capture all mousedown events from the canvas elements
    //     fromEvent(canvasE1, 'mousedown')
    //         .pipe(
    //             switchMap((e) => {
    //                 // after a mouse down, we'll record all mouse moves
    //         return fromEvent(canvasE1, 'mousemove')
    //             .pipe(
    //                 // we'll stop (and unsubscribe) once the user release the mouse
    //                 // this will trigger a 'mouseup' event
    //                 takeUntil(fromEvent(canvasE1, 'mouseup')),
    //                 // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouse leave event)
    //                 takeUntil(fromEvent(canvasE1, 'mouseleave')),
    //                 // pairwise lets us get the previous value to draw a line from
    //                 // the previous point to the current point
    //                 pairwise()
    //             );
    //         })
    //     ).subscribe((res: [MouseEvent, MouseEvent]) => {
    //         const rect = canvasE1.getBoundingClientRect();

    //         // previous and current position with the offset
    //         const prevPos = {
    //             x: res[0].clientX - rect.left,
    //             y: res[0].clientY - rect.top
    //         };
    //         const currentPos = {
    //             x: res[1].clientX - rect.left,
    //             y: res[1].clientY - rect.top
    //         };
    //         // this methods we'll implement soon to so the actual drawing
    //         this.drawOnCanvas(prevPos, currentPos);
    //     });
    // }
    // private drawOnCanvas(
    //     prevPos: { x: number, y: number },
    //     currentPos: { x: number, y: number }
    // ) {
    //     // in case the context is not set
    //     if (!this.cx) {
    //         return;
    //     }

    //     // start our drawing path
    //     this.cx.beginPath();

    //     // we're drawing lines so we need a previous position
    //     if (prevPos) {
    //         // sets the start point
    //         this.cx.moveTo(prevPos.x, prevPos.y); // from

    //         // draws a line from the start pos until the current position
    //         this.cx.lineTo(currentPos.x, currentPos.y);

    //         // strokes the current path with the styles we set earlier
    //         this.cx.stroke();
    //     }

    // }
}