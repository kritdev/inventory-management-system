import { Injectable } from '@angular/core';
import { imageDataList } from './sample-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public retrieveProductSummaryList() {
    return [
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 102,
        name: 'Dummy Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 502,
          countInStock: 3,  
        }],
        images: [{
          id: 602,
          imageData: imageDataList[0],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
      {
        id: 101,
        name: 'Small Chair',
        brand: 'Chicky Chair',
        category: {id:301, name:'Chair'},
        unitOfMeasure: {id:401, name:'pcs.'},
        stockItems: [{
          id: 501,
          countInStock: 10,  
        }],
        images: [{
          id: 601,
          imageData: imageDataList[1],
          imageDataContentType: "image/png",
          defaultImage: true,
        }],
      },
    ];
  }
}
