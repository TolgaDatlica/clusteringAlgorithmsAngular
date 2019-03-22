import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { clustersDbscan, clustersKmeans, points, polygon, centroid } from '@turf/turf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class KMeansPageService {
    constructor(
        private http: HttpClient
    ) {
    }
    public getWifiResult(macId): Observable<any> {
        return this.http.get('https://api.mylnikov.org/geolocation/wifi?bssid=' + macId)
            .pipe(catchError(
                e => throwError(e)
            )
            );
    }
    public dbscancluster(pointsElement, minpoints) {
        const listlocation = [];
        pointsElement.forEach(element => {
            listlocation.push([element.lon, element.lat]);
        });
        const listofoptions = points(listlocation);
        // const polygonObject = polygon([
        //     (listlocation.map(x => [x.lon, x.lat]))]
        // );
        return clustersDbscan(listofoptions, 0.045, { minPoints: minpoints });
        // 0.015 dar alan kümelemesi
    }
    public kmeanscluster(pointsElement, ClusterNumber) {
        const listlocation = [];
        pointsElement.forEach(element => {
            listlocation.push([element.lon, element.lat]);
        });
        const listofoptions = points(listlocation);
        // const polygonObject = polygon([
        //     (listlocation.map(x => [x.lon, x.lat]))]
        // );
        return clustersKmeans(listofoptions, { numberOfClusters: ClusterNumber });
    }
    public centerOfElements(centroidElements) {
        const polygonItem = polygon([
            (centroidElements.map(x => [x.lon, x.lat]))]
        );
        const centroidPoint = centroid(polygonItem);
        return {
            mac: 'CENTER',
            lon: centroidPoint.geometry.coordinates[0],
            lat: centroidPoint.geometry.coordinates[1],
            cluster: 'CENTER',
            clusterNumber: 99
        };
    }
    public getColorIcon(clusternumber: any) {
        let result = { Color: '(0,0,0)', Icon: 'assets/error.png' };
        switch (clusternumber) {
            case 0: {
                result = { Color: '(100, 100, 100)', Icon: 'assets/gaming0.png' };
                break;
            }
            case 1: {
                result = { Color: '(200, 200, 200)', Icon: 'assets/gaming1.png' };
                break;
            }
            case 2: {
                result = { Color: '(300, 300, 300)', Icon: 'assets/gaming2.png' };
                break;
            }
            case 3: {
                result = { Color: '(100, 200, 300)', Icon: 'assets/gaming3.png' };
                break;
            }
            case 4: {
                result = { Color: '(200, 200, 300)', Icon: 'assets/gaming4.png' };
                break;
            }
            case 5: {
                result = { Color: '(200, 100, 300)', Icon: 'assets/gaming5.png' };
                break;
            }
            case 6: {
                result = { Color: '(300, 200, 300)', Icon: 'assets/gaming6.png' };
                break;
            }
            case 7: {
                result = { Color: '(250, 200, 100)', Icon: 'assets/gaming7.png' };
                break;
            }
            case 8: {
                result = { Color: '(100, 200, 100)', Icon: 'assets/gaming8.png' };
                break;
            }
            case 9: {
                result = { Color: '(300, 100, 300)', Icon: 'assets/gaming9.png' };
                break;
            }
            case 10: {
                result = { Color: '(150, 250, 150)', Icon: 'assets/gaming10.png' };
                break;
            }
            case 99: {
                result = { Color: '(150, 100, 100)', Icon: 'assets/center1.png' };
                break;
            }
            default: {
                result = { Color: '(0,0,0)', Icon: 'assets/error.png' };
                break;
            }
        }
        return result;
    }
}
