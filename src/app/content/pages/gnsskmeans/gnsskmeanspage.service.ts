import { BehaviorSubject, Observable, Subject, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { clustersDbscan, clustersKmeans, points, polygon, centroid } from '@turf/turf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class GnssKMeansPageService {
    // tslint:disable-next-line:max-line-length
    public sampleData1 = {"Cmd":"Position","Et":"5C94BBE1","IMEI":"864547036476625","Type":"53","Source":"1","Lat":"0.00000","Long":"0.00000","Alt":"0","Error":"0","Batt":"3775","Location":[{"Lat":"39.87566021092","Lon":"32.86341688606"},{"Lat":"39.87562467057","Lon":"32.86352225391"},{"Lat":"39.87597479544","Lon":"32.8638360008"},{"Lat":"39.87566747332","Lon":"32.86352474914"},{"Lat":"39.87625720986","Lon":"32.86293844087"},{"Lat":"52.38233245992","Lon":"4.89938774784"},{"Lat":"39.87540935585","Lon":"32.86346663242"}],"Temp":"26.8","CRC":"B12F"};
    // tslint:disable-next-line:max-line-length
    public sampleData2 = {"Cmd":"Position","Et":"386D194D","IMEI":"358021087096511","Type":"54","Source":"1","Lat":"0.0","Long":"0.0","Alt":"0","Error":"0","Batt":"4110","WIFI":[{"MAC":"9c:4f:cf:56:c3:bc","SSID":"","RSSI":"-91"},{"MAC":"d8:c7:c8:12:ab:c1","SSID":"","RSSI":"-80"},{"MAC":"50:04:b8:27:d2:73","SSID":"","RSSI":"-91"},{"MAC":"d4:6e:0e:e9:37:a8","SSID":"","RSSI":"-79"},{"MAC":"d8:c7:c8:12:ad:20","SSID":"","RSSI":"-75"},{"MAC":"d4:6e:0e:dd:37:da","SSID":"","RSSI":"-84"},{"MAC":"ec:08:6b:d6:c2:46","SSID":"","RSSI":"-90"},{"MAC":"d8:c7:c8:12:97:c3","SSID":"","RSSI":"-69"},{"MAC":"d8:c7:c8:12:a6:e3","SSID":"","RSSI":"-87"},{"MAC":"ec:08:6b:fa:56:12","SSID":"","RSSI":"-92"}],"CRC":"3434"};
    // tslint:disable-next-line:max-line-length
    public sampleData3 = {"Cmd":"Position","Et":"5C949C67","IMEI":"358021087096511","Type":"53","Source":"1","Lat":"0.0","Long":"0.0","Alt":"0","Error":"0","Batt":"4118","WIFI":[{"MAC":"d8:c7:c8:71:cd:33","SSID":"","RSSI":"-68"},{"MAC":"d8:c7:c8:c2:4c:73","SSID":"","RSSI":"-88"},{"MAC":"d8:c7:c8:12:ab:c1","SSID":"","RSSI":"-84"},{"MAC":"18:a6:f7:96:ab:da","SSID":"","RSSI":"-92"},{"MAC":"d4:6e:0e:e9:39:40","SSID":"","RSSI":"-79"},{"MAC":"d8:c7:c8:12:ad:20","SSID":"","RSSI":"-63"},{"MAC":"cc:37:ab:1d:79:80","SSID":"","RSSI":"-92"},{"MAC":"cc:37:ab:1c:9d:90","SSID":"","RSSI":"-94"},{"MAC":"7c:8b:ca:88:87:ec","SSID":"","RSSI":"-87"},{"MAC":"d8:c7:c8:12:97:c3","SSID":"","RSSI":"-89"},{"MAC":"cc:37:ab:1b:d1:60","SSID":"","RSSI":"-94"},{"MAC":"d8:c7:c8:71:cf:b3","SSID":"","RSSI":"-88"}],"CRC":"8CDA"};
    // tslint:disable-next-line:max-line-length
    public sampleData4 = {"Cmd":"Position","Et":"5C948608","IMEI":"358021087096834","Type":"48","Source":"1","Lat":"0.00000","Long":"0.00000","Alt":"0","Error":"0","Batt":"4001","WIFI":[{"MAC":"00:1c:7b:78:c0:76","SSID":"","RSSI":"-67"},{"MAC":"b0:4e:26:b9:b4:b0","SSID":"","RSSI":"-76"},{"MAC":"9c:30:5b:b9:42:dc","SSID":"","RSSI":"-82"},{"MAC":"fc:4a:e9:6a:b8:af","SSID":"","RSSI":"-93"},{"MAC":"90:67:1c:48:5a:74","SSID":"","RSSI":"-92"},{"MAC":"20:aa:4b:f7:f8:a2","SSID":"","RSSI":"-90"},{"MAC":"00:27:19:c8:b1:62","SSID":"","RSSI":"-91"},{"MAC":"fc:4a:e9:87:15:81","SSID":"","RSSI":"-90"},{"MAC":"18:d6:c7:2c:89:3b","SSID":"","RSSI":"-86"},{"MAC":"a0:e4:cb:b0:63:77","SSID":"","RSSI":"-94"},{"MAC":"58:2a:f7:42:a4:84","SSID":"","RSSI":"-94"},{"MAC":"5c:6a:80:b6:e4:97","SSID":"","RSSI":"-84"},{"MAC":"ae:2b:6e:c0:69:da","SSID":"","RSSI":"-59"},{"MAC":"c8:3a:35:50:0f:c9","SSID":"","RSSI":"-90"},{"MAC":"fc:4a:e9:6d:f6:b6","SSID":"","RSSI":"-91"},{"MAC":"c4:f0:81:11:7a:0b","SSID":"","RSSI":"-86"},{"MAC":"5c:f4:ab:49:11:88","SSID":"","RSSI":"-89"},{"MAC":"f0:c8:50:b7:41:54","SSID":"","RSSI":"-92"},{"MAC":"84:47:65:08:01:34","SSID":"","RSSI":"-85"},{"MAC":"88:44:77:86:69:63","SSID":"","RSSI":"-89"},{"MAC":"5c:6a:80:7d:3e:ab","SSID":"","RSSI":"-94"},{"MAC":"2c:fd:a1:69:d2:e8","SSID":"","RSSI":"-89"},{"MAC":"88:d7:f6:5e:4f:c0","SSID":"","RSSI":"-74"}],"CRC":"291C"};
    // tslint:disable-next-line:max-line-length
    public sampleData5 = {"Cmd":"Position","Et":"5C9473B7","IMEI":"358021087096834","Type":"34","Source":"1","Lat":"0.00000","Long":"0.00000","Alt":"0","Error":"0","Batt":"4001","WIFI":[{"MAC":"00:1c:7b:78:c0:76","SSID":"","RSSI":"-72"},{"MAC":"b0:4e:26:b9:b4:b0","SSID":"","RSSI":"-80"},{"MAC":"90:67:1c:48:5a:74","SSID":"","RSSI":"-91"},{"MAC":"c4:f0:81:11:7a:0b","SSID":"","RSSI":"-74"},{"MAC":"fc:4a:e9:81:a2:80","SSID":"","RSSI":"-88"},{"MAC":"fc:4a:e9:1e:67:68","SSID":"","RSSI":"-82"},{"MAC":"fc:4a:e9:87:15:81","SSID":"","RSSI":"-89"},{"MAC":"e4:fb:5d:69:52:2a","SSID":"","RSSI":"-88"},{"MAC":"5c:6a:80:b6:e4:97","SSID":"","RSSI":"-86"},{"MAC":"18:d6:c7:2c:89:3b","SSID":"","RSSI":"-87"},{"MAC":"bc:75:74:ca:71:da","SSID":"","RSSI":"-93"},{"MAC":"00:e0:4c:73:49:f0","SSID":"","RSSI":"-89"},{"MAC":"f0:c8:50:b7:41:54","SSID":"","RSSI":"-94"},{"MAC":"90:ef:68:12:a8:43","SSID":"","RSSI":"-90"},{"MAC":"84:47:65:08:01:34","SSID":"","RSSI":"-87"},{"MAC":"04:bf:6d:ea:27:f6","SSID":"","RSSI":"-90"},{"MAC":"5c:e2:8c:d2:5c:b2","SSID":"","RSSI":"-94"},{"MAC":"2c:fd:a1:69:d2:e8","SSID":"","RSSI":"-88"},{"MAC":"18:28:61:e9:84:2c","SSID":"","RSSI":"-91"},{"MAC":"74:da:38:95:9e:c2","SSID":"","RSSI":"-85"},{"MAC":"00:1a:2b:85:3d:f6","SSID":"","RSSI":"-95"},{"MAC":"d0:60:8c:36:d7:38","SSID":"","RSSI":"-89"},{"MAC":"fc:4a:e9:6d:f6:b6","SSID":"","RSSI":"-87"},{"MAC":"fc:4a:e9:38:58:bb","SSID":"","RSSI":"-86"},{"MAC":"a8:f5:ac:eb:4a:8f","SSID":"","RSSI":"-93"},{"MAC":"88:d7:f6:5e:4f:c0","SSID":"","RSSI":"-72"},{"MAC":"18:28:61:72:4b:9d","SSID":"","RSSI":"-89"},{"MAC":"1a:28:61:72:4b:9e","SSID":"","RSSI":"-88"},{"MAC":"34:e8:94:01:bf:8b","SSID":"","RSSI":"-93"},{"MAC":"00:27:19:c8:b1:62","SSID":"","RSSI":"-92"},{"MAC":"5c:6a:80:b6:e4:97","SSID":"","RSSI":"-85"}],"CRC":"0907"};
    
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
        debugger;
        console.log('kmeanscluster');
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
