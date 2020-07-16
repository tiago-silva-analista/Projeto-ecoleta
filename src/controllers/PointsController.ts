import knex from '../database/connection';

import {Request, Response} from 'express';

class PointsController{

    async index(request:Request, response:Response){
        const {city, uf, items} = request.query;

        const parsedItems = String(items)
                            .split(',')
                            .map(item => Number(item.trim()));
         
        const points = await knex('points')
                        .join('point_items','points.id', '=','point_items.point_id')
                        .whereIn('point_items.item_id',parsedItems)
                        .where('city', String(city))
                        .where('uf',String(uf))
                        .distinct()
                        .select('points.*');
                            
        //console.log(city, uf,items);

        const serializedPoints = points.map( point => {
            return {
                ...point,
                image_url:`http://192.168.0.13:3333/uploads/${point.image}`
            }
        });

        return response.json(serializedPoints);
    }

    async show(request:Request, response: Response){
        const {id} = request.params;

        const point = await knex('points')
                            .where('id',id)
                            .first();

        if(!point){
            return response.status(400).json({message: 'Point not found'});
        }

        const items = await knex('items')
                .join('point_items','items.id', '=','point_items.item_id')
                .where('point_items.point_id',id)
                .select('items.title');

        const serializedPoint =  {
                ...point,
                image_url:`http://192.168.0.13:3333/uploads/${point.image}`
            };

        return response.json({point: serializedPoint,items});
                            
    }

    async create (request:Request, response:Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        console.log('passei aqui 1');
    
        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        const insertedIds = await trx('points').insert(point);
        console.log('passei aqui 2');
        const point_id = insertedIds[0];
        console.log(`passei aqui 3  - ${items}`);
        const pointItems = items.split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
            return{
                item_id,
                point_id,
            };
        })
        console.log('passei aqui 4');
        await trx('point_items').insert(pointItems);
        console.log('passei aqui 5');
        await trx.commit();
        console.log('passei aqui 6');
        return response.json({id: point_id,...point});
    }
}

export default  PointsController;