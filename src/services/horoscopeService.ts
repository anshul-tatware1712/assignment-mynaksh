import { Horoscope, ZodiacSign } from '../types';

export class HoroscopeService {
  static async getHoroscope(sign: ZodiacSign): Promise<Horoscope> {
    return this.getMockHoroscope(sign);
  }

  private static getMockHoroscope(sign: ZodiacSign): Horoscope {
    const randomIndex = Math.floor(Math.random() * 3);
    const descriptions = this.getVariedDescriptions(sign);
    const currentDate = new Date().toDateString();
    const randomLuckyNumber = String(Math.floor(Math.random() * 9) + 1);
    const randomLuckyTime = this.getRandomLuckyTime();
    
    const mockHoroscopeData: Record<ZodiacSign, Horoscope> = {
      aries: {
        current_date: currentDate,
        description: descriptions[randomIndex],
        compatibility: "Leo, Sagittarius",
        mood: "Energetic",
        color: "Red",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      taurus: {
        current_date: currentDate,
        description: this.getVariedDescriptions('taurus')[randomIndex],
        compatibility: "Virgo, Capricorn",
        mood: "Calm",
        color: "Green",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      gemini: {
        current_date: currentDate,
        description: this.getVariedDescriptions('gemini')[randomIndex],
        compatibility: "Libra, Aquarius",
        mood: "Curious",
        color: "Yellow",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      cancer: {
        current_date: currentDate,
        description: this.getVariedDescriptions('cancer')[randomIndex],
        compatibility: "Scorpio, Pisces",
        mood: "Intuitive",
        color: "Silver",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      leo: {
        current_date: currentDate,
        description: this.getVariedDescriptions('leo')[randomIndex],
        compatibility: "Aries, Sagittarius",
        mood: "Confident",
        color: "Gold",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      virgo: {
        current_date: currentDate,
        description: this.getVariedDescriptions('virgo')[randomIndex],
        compatibility: "Taurus, Capricorn",
        mood: "Analytical",
        color: "Navy Blue",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      libra: {
        current_date: currentDate,
        description: this.getVariedDescriptions('libra')[randomIndex],
        compatibility: "Gemini, Aquarius",
        mood: "Balanced",
        color: "Pink",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      scorpio: {
        current_date: currentDate,
        description: this.getVariedDescriptions('scorpio')[randomIndex],
        compatibility: "Cancer, Pisces",
        mood: "Intense",
        color: "Maroon",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      sagittarius: {
        current_date: currentDate,
        description: this.getVariedDescriptions('sagittarius')[randomIndex],
        compatibility: "Aries, Leo",
        mood: "Adventurous",
        color: "Purple",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      capricorn: {
        current_date: currentDate,
        description: this.getVariedDescriptions('capricorn')[randomIndex],
        compatibility: "Taurus, Virgo",
        mood: "Determined",
        color: "Brown",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      aquarius: {
        current_date: currentDate,
        description: this.getVariedDescriptions('aquarius')[randomIndex],
        compatibility: "Gemini, Libra",
        mood: "Innovative",
        color: "Turquoise",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      },
      pisces: {
        current_date: currentDate,
        description: this.getVariedDescriptions('pisces')[randomIndex],
        compatibility: "Cancer, Scorpio",
        mood: "Compassionate",
        color: "Sea Green",
        lucky_number: randomLuckyNumber,
        lucky_time: randomLuckyTime
      }
    };

    return mockHoroscopeData[sign];
  }

  private static getVariedDescriptions(sign: ZodiacSign): string[] {
    const descriptions: Record<ZodiacSign, string[]> = {
      aries: [
        "Today brings new opportunities for growth and adventure. Your natural leadership qualities will shine through in any challenges you face.",
        "Your fiery energy is at its peak today. Channel this passion into creative projects and meaningful connections.",
        "Bold decisions await you today. Trust your instincts and take the initiative in important matters."
      ],
      taurus: [
        "Stability and comfort are your themes today. Focus on building solid foundations in your personal and professional life.",
        "Your practical nature will guide you to wise decisions today. Take time to appreciate the simple pleasures in life.",
        "Patience and persistence will be your greatest assets today. Slow and steady progress leads to lasting success."
      ],
      gemini: [
        "Communication is key today. Your wit and charm will open doors to new connections and opportunities.",
        "Your curiosity leads you to fascinating discoveries today. Embrace learning and share your knowledge with others.",
        "Versatility is your superpower today. Adapt to changing circumstances with grace and intelligence."
      ],
      cancer: [
        "Trust your intuition today. Your emotional intelligence will guide you to make the right decisions.",
        "Home and family take center stage today. Nurture your relationships and create a harmonious environment.",
        "Your caring nature brings comfort to others today. Don't forget to show yourself the same compassion."
      ],
      leo: [
        "Your confidence and creativity are at their peak. It's a perfect day to showcase your talents and inspire others.",
        "The spotlight is on you today. Embrace your natural charisma and lead by example.",
        "Generosity and warmth define your interactions today. Your positive energy uplifts everyone around you."
      ],
      virgo: [
        "Attention to detail will serve you well today. Focus on organization and practical solutions to current challenges.",
        "Your analytical mind helps you see what others miss today. Use this insight to improve and perfect your work.",
        "Service to others brings you fulfillment today. Your helpful nature makes a real difference in people's lives."
      ],
      libra: [
        "Balance and harmony are essential today. Seek fairness in all your interactions and decisions.",
        "Your diplomatic skills help resolve conflicts today. Beauty and art inspire your creative expression.",
        "Partnerships flourish under your guidance today. Your sense of justice creates positive change."
      ],
      scorpio: [
        "Deep transformation is possible today. Embrace change and trust in your inner strength to overcome obstacles.",
        "Your intensity and passion drive meaningful progress today. Dive deep into what truly matters to you.",
        "Mystery and intuition guide your path today. Trust your instincts and embrace your powerful nature."
      ],
      sagittarius: [
        "Adventure calls to you today. Expand your horizons through learning, travel, or philosophical discussions.",
        "Your optimism and enthusiasm inspire others today. Share your wisdom and explore new possibilities.",
        "Freedom and exploration energize you today. Follow your wanderlust and embrace new experiences."
      ],
      capricorn: [
        "Discipline and perseverance will lead to success today. Stay focused on your long-term goals.",
        "Your ambition and determination open new doors today. Hard work pays off in meaningful ways.",
        "Leadership comes naturally to you today. Your practical approach inspires confidence in others."
      ],
      aquarius: [
        "Innovation and originality are your superpowers today. Think outside the box and embrace your uniqueness.",
        "Your humanitarian spirit makes a positive impact today. Connect with like-minded individuals for change.",
        "Technology and progress fascinate you today. Your forward-thinking ideas benefit the greater good."
      ],
      pisces: [
        "Your compassion and creativity flow freely today. Use your artistic talents and empathy to connect with others.",
        "Dreams and intuition guide your decisions today. Trust your inner wisdom and emotional intelligence.",
        "Your gentle nature brings healing to others today. Art, music, and spirituality nourish your soul."
      ]
    };
    return descriptions[sign];
  }

  private static getRandomLuckyTime(): string {
    const times = [
      "6am to 7am", "7am to 8am", "8am to 9am", "9am to 10am", "10am to 11am", "11am to 12pm",
      "12pm to 1pm", "1pm to 2pm", "2pm to 3pm", "3pm to 4pm", "4pm to 5pm", "5pm to 6pm",
      "6pm to 7pm", "7pm to 8pm", "8pm to 9pm", "9pm to 10pm"
    ];
    return times[Math.floor(Math.random() * times.length)];
  }
}
