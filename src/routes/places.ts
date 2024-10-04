import { Router, Request, Response } from 'express';
import { fetchNearbyPlaces } from '../service/nominatim.service';


const router = Router();

// GET: /api/places
router.get('/', async (req: Request, res: Response):Promise<any> => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const places = await fetchNearbyPlaces(Number(lat), Number(lon), 'fuel'); // Search for 'fuel' stations
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
});

export default router;

