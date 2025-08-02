import cap from '@/lib/cap-server';

// API endpoint handlers for Cap.js
export async function createChallenge() {
  try {
    const challenge = await cap.createChallenge();
    return {
      success: true,
      data: challenge
    };
  } catch (error) {
    console.error('Error creating challenge:', error);
    return {
      success: false,
      error: 'Failed to create challenge'
    };
  }
}

export async function redeemChallenge(token: string, solutions: any[]) {
  try {
    if (!token || !solutions) {
      return {
        success: false,
        error: 'Missing token or solutions'
      };
    }
    
    const result = await cap.redeemChallenge({ token, solutions });
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error redeeming challenge:', error);
    return {
      success: false,
      error: 'Failed to redeem challenge'
    };
  }
}

export async function validateToken(token: string, keepToken = false) {
  try {
    const result = await cap.validateToken(token, { keepToken });
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error validating token:', error);
    return {
      success: false,
      error: 'Failed to validate token'
    };
  }
}
