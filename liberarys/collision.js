 // collision.js

export function checkCollision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    // Collision detected
    return true;
  }

  // No collision
  return false;
}

export function checkCollisionCircleRect(circle, rect) {
  const circleDistanceX = Math.abs(circle.x - rect.x - rect.width / 2);
  const circleDistanceY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (
    circleDistanceX > rect.width / 2 + circle.radius ||
    circleDistanceY > rect.height / 2 + circle.radius
  ) {
    // No collision
    return false;
  }

  if (
    circleDistanceX <= rect.width / 2 ||
    circleDistanceY <= rect.height / 2
  ) {
    // Collision detected
    return true;
  }

  const cornerDistanceSq =
    (circleDistanceX - rect.width / 2) ** 2 +
    (circleDistanceY - rect.height / 2) ** 2;

  return cornerDistanceSq <= circle.radius ** 2;
}

export function getRectFromPosition(x, y, width, height) {
  return { x, y, width, height };
}

export function getRectCenter(rect) {
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  return { x: centerX, y: centerY };
}

export function getRectFromCenter(centerX, centerY, width, height) {
  const x = centerX - width / 2;
  const y = centerY - height / 2;

  return { x, y, width, height };
}

export function getRectFromElement(element) {
  const { x, y, width, height } = element.getBoundingClientRect();
  return { x, y, width, height };
}
